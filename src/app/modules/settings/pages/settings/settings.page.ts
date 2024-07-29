import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@app/core';
import { AuthenticationService } from '@app/core/authentication';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly navController: NavController,
    private readonly dialogService: DialogService,
  ) {}

  public async logout(): Promise<void> {
    const confirmed = await this.dialogService.showConfirmAlert({
      header: 'Abmelden',
      message: 'Möchtest du dich wirklich abmelden?',
    });
    if (!confirmed) {
      return;
    }
    this.authenticationService.logout();
    await this.navController.navigateRoot(['/login']);
  }
}
