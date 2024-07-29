import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Config } from '@app/config';
import { NotificationService } from '@app/core';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-sos',
  templateUrl: './sos.page.html',
  styleUrls: ['./sos.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SosPage {
  public sosMoreInformationLink: string;

  constructor(private readonly notificationService: NotificationService) {
    this.sosMoreInformationLink = Config.sosMoreInformationLink;
  }

  public async copyToClipboard(value: string): Promise<void> {
    await Clipboard.write({ string: value });
    await this.showToast('In die Zwischenablage kopiert');
  }

  private async showToast(message: string): Promise<void> {
    await this.notificationService.showToast({
      message: message,
    });
  }

  public openWindow(url: string): void {
    window.open(url, '_self');
  }
}
