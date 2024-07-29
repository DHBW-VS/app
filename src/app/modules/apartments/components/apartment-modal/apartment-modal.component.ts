import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DialogService, IApartment, NotificationService } from '@app/core';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-apartment-modal',
  templateUrl: './apartment-modal.component.html',
  styleUrls: ['./apartment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentModalComponent {
  @Input()
  public apartment: IApartment | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly notificationService: NotificationService,
  ) {}

  public async copyToClipboard(value: string): Promise<void> {
    await Clipboard.write({ string: value });
    await this.showToast();
  }

  public openWindow(url: string): void {
    window.open(url, '_self');
  }

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal();
  }

  private async showToast(): Promise<void> {
    await this.notificationService.showToast({
      message: 'In die Zwischenablage kopiert',
    });
  }
}
