import { Injectable } from '@angular/core';
import { ApiPlansService, IPlan, IPlanStorage, StorageKey, StorageService } from '@app/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Share } from '@capacitor/share';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  public readonly dataDirectoryPath: string;
  public readonly timetableDirName: string = 'timetables';

  constructor(
    private readonly apiPlansService: ApiPlansService,
    private readonly file: File,
    private readonly platform: Platform,
    private readonly storageService: StorageService,
  ) {
    if (this.platform.is('ios') || this.file.externalDataDirectory === null) {
      this.dataDirectoryPath = this.file.dataDirectory;
    } else {
      this.dataDirectoryPath = this.file.externalDataDirectory;
    }
  }

  public async getTimetableList(course: string): Promise<IPlan[]> {
    return this.apiPlansService.findAll(course);
  }

  public async downloadTimetable(timetable: IPlan): Promise<any> {
    const fileBlob: Blob = await this.apiPlansService.download(timetable.id);
    try {
      await this.file.checkDir(this.dataDirectoryPath, this.timetableDirName);
    } catch (error) {
      if ((error as any)?.code === 1) {
        await this.file.createDir(this.dataDirectoryPath, this.timetableDirName, false);
      } else {
        throw error;
      }
    }
    return this.file.writeFile(this.dataDirectoryPath + this.timetableDirName, timetable.filename, fileBlob, {
      replace: true,
    });
  }

  public async openTimetable(timetable: IPlan): Promise<any> {
    return FileOpener.openFile({
      path: this.dataDirectoryPath + this.timetableDirName + '/' + timetable.filename,
      mimeType: 'application/pdf',
    });
  }

  public async checkTimetable(timetable: IPlan): Promise<boolean> {
    return this.file.checkFile(this.dataDirectoryPath + this.timetableDirName + '/', timetable.filename);
  }

  public async shareTimetableAsPdf(timetable: IPlan): Promise<void> {
    try {
      await Share.share({
        url: this.dataDirectoryPath + this.timetableDirName + '/' + timetable.filename,
      });
    } catch (error) {
      if (error instanceof Error && error.message && error.message.includes('canceled')) {
        return;
      }
      throw error;
    }
  }

  public async shareTimetableAsICalendar(timetable: IPlan): Promise<void> {
    if (!timetable.iCalendarKey) {
      return;
    }
    const iCalendarLink = this.buildICalendarLink(timetable.iCalendarKey);
    try {
      await Share.share({
        url: iCalendarLink,
      });
    } catch (error) {
      if (error instanceof Error && error.message && error.message.includes('canceled')) {
        return;
      }
      throw error;
    }
  }

  public async setLastOpenedTimetable(timetable: IPlan): Promise<void> {
    let storageData: IPlanStorage | null = await this.storageService.retrieveData<IPlanStorage>(StorageKey.Plan);
    if (storageData) {
      storageData.lastOpenedTimetable = timetable;
    } else {
      storageData = { cache: [], lastOpenedTimetable: timetable };
    }
    await this.storageService.storeData<IPlanStorage>(StorageKey.Plan, storageData);
  }

  public async getLastOpenedTimetable(): Promise<IPlan | undefined> {
    const storageData: IPlanStorage | null = await this.storageService.retrieveData<IPlanStorage>(StorageKey.Plan);
    if (!storageData) {
      return;
    }
    return storageData.lastOpenedTimetable;
  }

  public buildICalendarLink(iCalendarKey: string) {
    return this.apiPlansService.buildICalendarLink(iCalendarKey);
  }
}
