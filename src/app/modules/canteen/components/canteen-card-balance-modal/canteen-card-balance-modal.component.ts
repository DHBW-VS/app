import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService, NfcHelperService, NfcService, TimeoutService } from '@app/core';
import { Capacitor } from '@capacitor/core';
import { NfcTagTechType } from '@capawesome-team/capacitor-nfc';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-canteen-card-balance-modal',
  templateUrl: './canteen-card-balance-modal.component.html',
  styleUrls: ['./canteen-card-balance-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanteenCardBalanceModalComponent {
  public balance: WritableSignal<number | undefined> = signal(undefined);
  public isScanSessionActive: WritableSignal<boolean> = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  private readonly cancelSubject = new Subject<void>();
  private readonly cancel$ = this.cancelSubject.asObservable();

  private activeWriterAlert: HTMLIonAlertElement | undefined;

  constructor(
    private readonly dialogService: DialogService,
    private readonly nfcService: NfcService,
    private readonly nfcHelperService: NfcHelperService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly timeoutService: TimeoutService,
  ) {}

  public async closeModal(): Promise<void> {
    await this.dialogService.dismissModal();
  }

  public async startScanSession(): Promise<void> {
    this.isScanSessionActive.set(true);
    this.balance.set(undefined);
    try {
      await this.nfcService.startScanSession();
    } catch (error) {
      throw error;
    } finally {
      /**
       * **Workaround**
       *
       * The error dialog is not consistently presented and you had to interact
       * with the page first (e.g. by random click) for the alert to show up.
       */
      await this.timeoutService.timeout(() => this.changeDetectorRef.detectChanges(), 1);
      this.isScanSessionActive.set(false);
    }
    await this.showScanSessionAlert();
    this.nfcService.scannedTag$
      .pipe(
        takeUntil(this.cancel$),
        takeUntil(this.nfcService.sessionCanceled$),
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(async () => {
        try {
          const techType = Capacitor.getPlatform() === 'ios' ? NfcTagTechType.Iso7816 : NfcTagTechType.IsoDep;
          // 1. Connect to the tag
          await this.nfcService.connect(techType);
          // 2. Select the application file (see https://github.com/astarub/campus_app/blob/da514b8ea02d369b34a46d69b6a4ddb42922a90b/android/app/src/main/kotlin/de/asta_bochum/campus_app/PopupActivity.kt#L110)
          const appBytes = this.nfcHelperService.convertHexToBytes('0x905A0000035F841500');
          await this.nfcService.transceive(techType, appBytes);
          // 3. Read the balance (see https://github.com/astarub/campus_app/blob/da514b8ea02d369b34a46d69b6a4ddb42922a90b/android/app/src/main/kotlin/de/asta_bochum/campus_app/PopupActivity.kt#L118)
          const balanceBytes = this.nfcHelperService.convertHexToBytes('0x906C0000010100');
          const response = await this.nfcService.transceive(techType, balanceBytes);
          // 4. Parse the balance
          const balance = this.convertBytesToBalance(response);
          this.balance.set(balance);
          // 5. Close the connection
          await this.nfcService.close();
        } finally {
          await this.stopScanSession();
        }
      });
  }

  private convertBytesToBalance(bytes: number[]): number {
    let trimmedBytes = [...bytes];
    trimmedBytes.pop();
    trimmedBytes.pop();
    trimmedBytes.reverse();
    const hex = this.nfcHelperService.convertBytesToHex(trimmedBytes);
    const balance = this.nfcHelperService.convertHexToNumber(hex);
    console.log({ bytes, trimmedBytes, hex, balance });
    return balance;
  }

  private async showScanSessionAlert(): Promise<void> {
    const isIos = Capacitor.getPlatform() === 'ios';
    if (isIos) {
      return;
    }
    this.activeWriterAlert = await this.dialogService.showAlert({
      header: 'Guthaben auslesen',
      message: 'Bitte halte deine Karte zum Auslesen des Guthabens an die Rückseite deines Smartphones.',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          handler: () => {
            void this.stopScanSession();
          },
        },
      ],
    });
  }

  private async stopScanSession(): Promise<void> {
    this.isScanSessionActive.set(false);
    void this.activeWriterAlert?.dismiss();
    this.cancelSubject.next(undefined);
    await this.nfcService.stopScanSession();
  }
}
