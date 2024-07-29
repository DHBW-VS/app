import { Injectable } from '@angular/core';
import { NfcTag, NfcTagTechType } from '@capawesome-team/capacitor-nfc';
import { Observable } from 'rxjs';
import { CapacitorNfcService } from '../../capacitor';

@Injectable({
  providedIn: 'root',
})
export class NfcService {
  constructor(private readonly capacitorNfcService: CapacitorNfcService) {}

  public get scannedTag$(): Observable<NfcTag> {
    return this.capacitorNfcService.scannedTag$;
  }

  public get sessionCanceled$(): Observable<void> {
    return this.capacitorNfcService.sessionCanceled$;
  }

  public async startScanSession(): Promise<void> {
    const isSupported = await this.isSupported();
    if (!isSupported) {
      throw this.createNotSupportedError();
    }
    const isEnabled = await this.isEnabled();
    if (!isEnabled) {
      throw this.createNotEnabledError();
    }
    await this.capacitorNfcService.startScanSession();
  }

  public async stopScanSession(): Promise<void> {
    await this.capacitorNfcService.stopScanSession();
  }

  public async transceive(techType: NfcTagTechType, data: number[]): Promise<number[]> {
    const { response } = await this.capacitorNfcService.transceive({
      techType,
      data,
    });
    return response;
  }

  public async connect(techType: NfcTagTechType): Promise<void> {
    await this.capacitorNfcService.connect({
      techType,
    });
  }

  public async close(): Promise<void> {
    await this.capacitorNfcService.close();
  }

  public isSupported(): Promise<boolean> {
    return this.capacitorNfcService.isSupported();
  }

  public isEnabled(): Promise<boolean> {
    return this.capacitorNfcService.isEnabled();
  }

  private createNotSupportedError(): Error {
    const message = 'Dein Gerät unterstützt kein NFC.';
    return new Error(message);
  }

  private createNotEnabledError(): Error {
    const message = 'Bitte aktiviere NFC in den Einstellungen deines Geräts.';
    return new Error(message);
  }
}
