import { Injectable, NgZone } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  ConnectOptions,
  Nfc,
  NfcTag,
  PollingOption,
  TransceiveOptions,
  TransceiveResult,
} from '@capawesome-team/capacitor-nfc';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitorNfcService {
  private readonly scannedTagSubject = new Subject<NfcTag>();
  private readonly sessionCanceledSubject = new Subject<void>();

  constructor(private readonly ngZone: NgZone) {
    void Nfc.removeAllListeners().then(() => {
      void Nfc.addListener('nfcTagScanned', event => {
        this.ngZone.run(() => {
          this.scannedTagSubject.next(event.nfcTag);
        });
      });
      void Nfc.addListener('scanSessionCanceled', () => {
        this.ngZone.run(() => {
          this.sessionCanceledSubject.next();
        });
      });
    });
  }

  public get scannedTag$(): Observable<NfcTag> {
    return this.scannedTagSubject.asObservable();
  }

  public get sessionCanceled$(): Observable<void> {
    return this.sessionCanceledSubject.asObservable();
  }

  public async startScanSession(): Promise<void> {
    await Nfc.startScanSession({
      pollingOptions: [PollingOption.iso14443, PollingOption.iso15693],
    });
  }

  public async stopScanSession(): Promise<void> {
    await Nfc.stopScanSession();
  }

  public transceive(options: TransceiveOptions): Promise<TransceiveResult> {
    return Nfc.transceive(options);
  }

  public async connect(options: ConnectOptions): Promise<void> {
    const isAndroid = Capacitor.getPlatform() === 'android';
    if (isAndroid) {
      await Nfc.connect(options);
    }
  }

  public async close(): Promise<void> {
    const isAndroid = Capacitor.getPlatform() === 'android';
    if (isAndroid) {
      await Nfc.close();
    }
  }

  public async isSupported(): Promise<boolean> {
    const { isSupported } = await Nfc.isSupported();
    return isSupported;
  }

  public async isEnabled(): Promise<boolean> {
    const isAndroid = Capacitor.getPlatform() === 'android';
    if (!isAndroid) {
      return true;
    }
    const { isEnabled } = await Nfc.isEnabled();
    return isEnabled;
  }
}
