import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ApiApartmentsService, DialogService, IApartment, NotificationService } from '@app/core';
import { IonSlides } from '@ionic/angular';
import { ApartmentsMenuPopoverComponent } from '../../components';

interface IApartmentsPageData {
  offers: {
    data: IApartment[];
    offset: number;
    infiniteLoadingEnabled: boolean;
  };
  searches: {
    data: IApartment[];
    offset: number;
    infiniteLoadingEnabled: boolean;
  };
}

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.page.html',
  styleUrls: ['./apartments.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentsPage implements OnInit {
  public apartments: IApartmentsPageData | undefined;
  public segment: 'offers' | 'searches' = 'offers';

  @ViewChild('slides')
  public slides: IonSlides | undefined;

  public readonly limit: number = 10;

  constructor(
    private readonly dialogService: DialogService,
    private readonly apiApartmentsService: ApiApartmentsService,
    private readonly notificationService: NotificationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.initApartmentPage();
  }

  public async setSegmentByIndex(activeIndex: Promise<number>): Promise<void> {
    const index = await activeIndex;
    this.segment = index === 1 ? 'searches' : 'offers';
    this.changeDetectorRef.markForCheck();
  }

  public getIndexOfSegment(): number {
    return this.segment === 'searches' ? 1 : 0;
  }

  private async initApartmentPage(): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const apartmentOffers: IApartment[] = await this.apiApartmentsService.findAllOffers({
        limit: this.limit,
        offset: 0,
      });
      const apartmentSearches: IApartment[] = await this.apiApartmentsService.findAllSearches({
        limit: this.limit,
        offset: 0,
      });
      this.apartments = {
        offers: {
          data: apartmentOffers,
          offset: this.limit,
          infiniteLoadingEnabled: true,
        },
        searches: {
          data: apartmentSearches,
          offset: this.limit,
          infiniteLoadingEnabled: true,
        },
      };
    } catch {
      await this.dialogService.showErrorAlert({
        message: 'Abfrage fehlgeschlagen! Bitte versuche es später erneut.',
      });
    } finally {
      this.changeDetectorRef.markForCheck();
      await loading.dismiss();
    }
  }

  public async loadMoreApartments(event: any): Promise<void> {
    if (!this.apartments) {
      return;
    }
    try {
      if (this.segment === 'offers') {
        const offers = await this.apiApartmentsService.findAllOffers({
          limit: this.limit,
          offset: this.apartments.offers.offset,
        });
        this.apartments.offers.data.push(...offers);
        this.apartments.offers.offset += this.limit;
        if (offers.length < this.limit) {
          this.apartments.offers.infiniteLoadingEnabled = false;
        }
      }
      if (this.segment === 'searches') {
        const searches = await this.apiApartmentsService.findAllOffers({
          limit: this.limit,
          offset: this.apartments.searches.offset,
        });
        this.apartments.searches.data.push(...searches);
        this.apartments.searches.offset += this.limit;
        if (searches.length < this.limit) {
          this.apartments.searches.infiniteLoadingEnabled = false;
        }
      }
    } catch {
      void this.showToast();
    } finally {
      this.changeDetectorRef.markForCheck();
      await new Promise(resolve => setTimeout(resolve, 250));
      await this.slides?.updateAutoHeight();
      event.target.complete();
    }
  }

  public trackByIndex(index: number, item: unknown): number {
    return index;
  }

  private async showToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'Laden fehlgeschlagen!',
      duration: 3000,
      position: 'bottom',
    });
  }

  public async showMenuPopover(event: Event): Promise<void> {
    await this.dialogService.showPopover({
      component: ApartmentsMenuPopoverComponent,
      event: event,
    });
  }
}
