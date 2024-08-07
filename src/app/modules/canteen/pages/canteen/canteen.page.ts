import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ApiCanteenService,
  DialogService,
  ICanteenMenu,
  ICanteenStorage,
  NotificationService,
  StorageKey,
  StorageService,
} from '@app/core';
import { CanteenMenuPopoverComponent } from '../../components';

@Component({
  selector: 'app-canteen',
  templateUrl: './canteen.page.html',
  styleUrls: ['./canteen.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanteenPage implements OnInit {
  public menus: ICanteenMenu[] | undefined;
  public segment: number = 0;

  @ViewChild('slides')
  public slidesElementRef: ElementRef | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly apiCanteenService: ApiCanteenService,
    private readonly notificationService: NotificationService,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.initMensaPage();
  }

  public async showMenuPopover(event: Event): Promise<void> {
    await this.dialogService.showPopover({
      component: CanteenMenuPopoverComponent,
      event: event,
    });
  }

  public async onSegmentChange(event: CustomEvent): Promise<void> {
    const index: number = event.detail.value;
    if (!this.slidesElementRef) {
      return;
    }
    await this.slidesElementRef.nativeElement.swiper.slideTo(index);
  }

  public async onSlideChange(): Promise<void> {
    if (!this.slidesElementRef) {
      return;
    }
    const index: unknown = this.slidesElementRef.nativeElement.swiper.activeIndex;
    if (typeof index !== 'number') {
      return;
    }
    this.setSegment(index);
  }

  private async initMensaPage(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const menus: ICanteenMenu[] = await this.apiCanteenService.findAll();
      this.menus = menus;
      const canteenIsOpen: boolean = this.canteenIsOpen(menus);
      if (canteenIsOpen) {
        const storageData: ICanteenStorage = { cache: menus };
        await this.storageService.storeData(StorageKey.Canteen, storageData);
      } else {
        await this.dialogService.showErrorAlert({
          header: 'Geschlossen',
          message: 'Die Mensa hat zurzeit nicht geöffnet.',
        });
      }
    } catch {
      const storageData: ICanteenStorage | null = await this.storageService.retrieveData<ICanteenStorage>(
        StorageKey.Canteen,
      );
      if (storageData) {
        this.menus = storageData.cache;
      }
      if (this.menus) {
        await this.showToast();
      } else {
        await this.showAlert();
      }
    } finally {
      this.changeDetectorRef.markForCheck();
      await loading.dismiss();
    }
  }

  private setSegment(activeIndex: number): void {
    this.segment = activeIndex;
    this.changeDetectorRef.markForCheck();
  }

  public canteenIsOpen(menus: ICanteenMenu[]): boolean {
    if (menus.length === 0) {
      return false;
    }
    return true;
  }

  public removeYearFromDateString(date: string): string {
    return date.slice(0, -4);
  }

  private async showAlert(): Promise<void> {
    await this.dialogService.showErrorAlert({
      message: 'Abfrage fehlgeschlagen! Bitte versuche es später erneut.',
    });
  }

  private async showToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'Aktualisierung fehlgeschlagen!',
    });
  }
}
