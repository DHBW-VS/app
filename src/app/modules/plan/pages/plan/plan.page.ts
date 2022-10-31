import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  DialogService,
  IPlan,
  IPlanStorage,
  NotificationService,
  StorageKey,
  StorageService,
  UserService,
} from '@app/core';
import { CalendarModalComponent } from '../../components';
import { PlanService } from '../../services';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPage implements OnInit {
  public timetableList: IPlan[] | undefined;
  public selectedTimetable: number | undefined;
  public timetableSelection: any = {
    title: 'Vorlesungsplan',
    subTitle: 'Wähle deinen Vorlesungsplan aus',
  };

  constructor(
    private readonly planService: PlanService,
    private readonly dialogService: DialogService,
    private readonly storageService: StorageService,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.initPlanPage();
  }

  private async initPlanPage(): Promise<void> {
    const isStudent = this.userService.isStudent();
    if (isStudent === true) {
      await this.initTimetableCard();
    }
  }

  private async initTimetableCard(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    const lastOpenedTimetable: IPlan | undefined = await this.planService.getLastOpenedTimetable();
    if (lastOpenedTimetable) {
      this.selectedTimetable = lastOpenedTimetable.id;
    }
    const course: string = await this.userService.getCourse();
    try {
      const timetableList = await this.planService.getTimetableList(course);
      this.timetableList = timetableList;
      const storageData: IPlanStorage = { cache: timetableList, lastOpenedTimetable: undefined };
      await this.storageService.storeData(StorageKey.Plan, storageData);
    } catch {
      const storageData: IPlanStorage | null = await this.storageService.retrieveData<IPlanStorage>(StorageKey.Plan);
      if (storageData) {
        this.timetableList = storageData.cache;
      }
      if (!this.timetableList) {
        await this.showAlert('Abfrage fehlgeschlagen! Bitte versuche es später erneut.');
      } else {
        await this.showToast();
      }
    } finally {
      this.changeDetectorRef.markForCheck();
      await loading.dismiss();
    }
  }

  public async showTimetable(): Promise<void> {
    if (!this.selectedTimetable || !this.timetableList) {
      return;
    }
    const timetable: IPlan | undefined = this.timetableList.find(item => item.id === this.selectedTimetable);
    if (!timetable) {
      return;
    }
    if (timetable.iCalendarKey) {
      await this.openTimetableAsICalendar(timetable);
    } else {
      await this.openTimetableAsPdf(timetable);
    }
  }

  private async openTimetableAsPdf(timetable: IPlan): Promise<void> {
    try {
      await this.planService.checkTimetable(timetable);
    } catch {
      const loading = await this.dialogService.showLoading();
      try {
        await this.planService.downloadTimetable(timetable);
      } catch {
        await loading.dismiss();
        return this.showAlert('Abfrage fehlgeschlagen! Bitte versuche es später erneut.');
      }
      await loading.dismiss();
    }
    try {
      await this.planService.openTimetable(timetable);
      await this.planService.setLastOpenedTimetable(timetable);
    } catch {
      await this.showAlert('Die PDF-Datei konnte nicht geöffnet werden.');
    }
  }

  private async openTimetableAsICalendar(timetable: IPlan): Promise<void> {
    if (!timetable.iCalendarKey) {
      return;
    }
    const iCalendarLink = this.planService.buildICalendarLink(timetable.iCalendarKey);
    await this.dialogService.showModal({
      component: CalendarModalComponent,
      componentProps: {
        iCalendarLink: iCalendarLink,
        exportTimetableAsPdf: () => this.exportTimetableAsPdf(timetable),
        exportTimetableAsICalendar: () => this.exportTimetableAsICalendar(timetable),
      },
      cssClass: 'fullscreen-modal',
    });
    await this.planService.setLastOpenedTimetable(timetable);
  }

  private async exportTimetableAsPdf(timetable: IPlan): Promise<void> {
    try {
      await this.planService.checkTimetable(timetable);
    } catch {
      const loading = await this.dialogService.showLoading();
      try {
        await this.planService.downloadTimetable(timetable);
      } catch {
        await loading.dismiss();
        return this.showAlert('Abfrage fehlgeschlagen! Bitte versuche es später erneut.');
      }
      await loading.dismiss();
    }
    try {
      await this.planService.shareTimetableAsPdf(timetable);
    } catch {
      await this.showAlert('Die PDF-Datei konnte nicht exportiert werden.');
    }
  }

  private async exportTimetableAsICalendar(timetable: IPlan): Promise<void> {
    try {
      await this.planService.shareTimetableAsICalendar(timetable);
    } catch {
      await this.showAlert('Die iCalendar-Datei konnte nicht exportiert werden.');
    }
  }

  private async showAlert(message: string): Promise<void> {
    await this.dialogService.showErrorAlert({
      message,
    });
  }

  private async showToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'Aktualisierung fehlgeschlagen!',
    });
  }
}
