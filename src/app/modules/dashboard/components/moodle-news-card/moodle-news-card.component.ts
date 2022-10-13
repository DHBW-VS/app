import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ApiMoodleNewsService,
  DialogService,
  IMoodleNews,
  IMoodleNewsStorage,
  NotificationService,
  StorageKey,
  StorageService,
} from '@app/core';
import { MoodleNewsModalComponent } from '../moodle-news-modal/moodle-news-modal.component';

@Component({
  selector: 'app-moodle-news-card',
  templateUrl: './moodle-news-card.component.html',
  styleUrls: ['./moodle-news-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoodleNewsCardComponent implements OnInit {
  public moodleNews: IMoodleNews[] | undefined;

  constructor(
    private readonly apiMoodleNewsService: ApiMoodleNewsService,
    private readonly storageService: StorageService,
    private readonly notificationService: NotificationService,
    private readonly dialogService: DialogService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.initMoodleNewsCard();
  }

  private async initMoodleNewsCard(): Promise<void> {
    try {
      const news = await this.apiMoodleNewsService.findAll();
      this.moodleNews = news;
      const storageData: IMoodleNewsStorage = { cache: news };
      await this.storageService.storeData<IMoodleNewsStorage>(StorageKey.MoodleNews, storageData);
    } catch {
      const storageData: IMoodleNewsStorage | null = await this.storageService.retrieveData<IMoodleNewsStorage>(
        StorageKey.MoodleNews,
      );
      if (storageData) {
        this.moodleNews = storageData.cache;
      }
      await this.showToast();
    } finally {
      this.changeDetectorRef.markForCheck();
    }
  }

  private async showToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'Aktualisierung fehlgeschlagen!',
      duration: 3000,
      position: 'bottom',
    });
  }

  public async showMoodleNewsModal(moodleNews: IMoodleNews): Promise<void> {
    await this.dialogService.showModal({
      component: MoodleNewsModalComponent,
      componentProps: { moodleNews: moodleNews },
    });
  }
}
