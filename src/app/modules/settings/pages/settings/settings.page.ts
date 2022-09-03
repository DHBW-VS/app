import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  ) {}

  public async logout(): Promise<boolean> {
    this.authenticationService.logout();
    return this.navController.navigateRoot(['/login']);
  }
}
