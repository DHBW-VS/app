import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  public loginFormGroup: UntypedFormGroup;

  constructor(
    private readonly menuController: MenuController,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
  ) {
    this.loginFormGroup = new UntypedFormGroup({
      username: new UntypedFormControl('', {
        validators: Validators.required,
      }),
      password: new UntypedFormControl('', {
        validators: Validators.required,
      }),
    });
  }

  public ngOnInit(): void {
    void this.menuController.enable(true, 'unauthenticated');
  }

  public async login(loginFormGroup: UntypedFormGroup): Promise<boolean> {
    if (!loginFormGroup.valid) {
      await this.showAlert('Einloggen fehlgeschlagen! Bitte fülle alle Eingabefelder aus.');
      return false;
    }
    const loading = await this.dialogService.showLoading();
    try {
      const loginSuccessful: boolean = await this.authenticationService.login(
        loginFormGroup.value.username,
        loginFormGroup.value.password,
      );
      if (loginSuccessful) {
        return this.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        await this.showAlert('Einloggen fehlgeschlagen! Anmeldename oder Kennwort falsch.');
      }
    } finally {
      await loading.dismiss();
    }
    return false;
  }

  private async showAlert(message: string): Promise<void> {
    await this.dialogService.showErrorAlert({
      message,
    });
  }
}
