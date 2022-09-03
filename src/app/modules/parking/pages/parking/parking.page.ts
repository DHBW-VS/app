import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Config } from '@app/config';
import { ApiParkingService, NotificationService } from '@app/core';
import { IParking } from '@app/core/interfaces';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.page.html',
  styleUrls: ['./parking.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkingPage {
  public parkingData: IParking[] | undefined;
  public intervalId: number | undefined;
  public toastPresent: boolean = false;

  constructor(
    private readonly apiParkingService: ApiParkingService,
    private readonly notificationService: NotificationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ionViewDidEnter(): void {
    void this.initParkingPage();
  }

  public ionViewWillLeave(): void {
    clearInterval(this.intervalId);
    if (this.toastPresent === true) {
      void this.notificationService.dismissToast();
    }
  }

  private async initParkingPage(): Promise<void> {
    await this.showToast();
    this.intervalId = setInterval(() => {
      void this.updateParkingPage();
    }, Config.parkingIntervalValue) as any;
    await this.updateParkingPage();
  }

  public trackByIndex(index: number, item: unknown): number {
    return index;
  }

  private async updateParkingPage(): Promise<void> {
    try {
      const parkingData: IParking[] = await this.apiParkingService.findAll();
      this.parkingData = parkingData;
      if (this.toastPresent === true) {
        await this.notificationService.dismissToast();
        this.toastPresent = false;
      }
    } catch {
      if (this.toastPresent === false) {
        await this.showToast();
      }
    } finally {
      this.changeDetectorRef.markForCheck();
    }
  }

  private async showToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'Verbindung wird hergestellt...',
      position: 'bottom',
    });
    this.toastPresent = true;
  }
}
