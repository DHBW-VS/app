import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService, IDualisStorage, StorageKey, StorageService } from '@app/core';
import { DualisAuthService } from '../../services';

@Component({
  selector: 'app-dualis-login',
  templateUrl: './dualis-login.page.html',
  styleUrls: ['./dualis-login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualisLoginPage implements OnInit {
  public loginFormGroup: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', {
      validators: Validators.required,
    }),
    password: new UntypedFormControl('', {
      validators: Validators.required,
    }),
    storeUsername: new UntypedFormControl(false),
  });

  constructor(
    private readonly dialogService: DialogService,
    private readonly dualisAuthService: DualisAuthService,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    void this.init();
  }

  public async submitLoginForm(loginFormGroup: UntypedFormGroup): Promise<void> {
    if (!loginFormGroup.valid) {
      await this.dialogService.showErrorAlert({ message: 'Bitte fülle alle Eingabefelder aus.' });
      return;
    }
    return this.login(loginFormGroup.value.username, loginFormGroup.value.password, loginFormGroup.value.storeUsername);
  }

  private async init(): Promise<void> {
    const storageData: IDualisStorage | null = await this.storageService.retrieveData<IDualisStorage>(
      StorageKey.Dualis,
    );
    if (storageData?.username) {
      this.loginFormGroup.patchValue({
        username: storageData.username,
        storeUsername: true,
      });
    }
    this.changeDetectorRef.markForCheck();
  }

  private async login(username: string, password: string, storeUsername: boolean): Promise<void> {
    const loading = await this.dialogService.showLoading();
    try {
      const successfulLogin: boolean = await this.dualisAuthService.login(username, password);
      if (successfulLogin === true) {
        await this.storageService.storeData<IDualisStorage>(StorageKey.Dualis, {
          username: storeUsername ? username : '',
        });
        await this.router.navigate(['/dualis'], { replaceUrl: true });
      } else {
        await this.dialogService.showErrorAlert({ message: 'Benutzername oder Passwort falsch.' });
      }
    } finally {
      await loading.dismiss();
    }
  }
}
