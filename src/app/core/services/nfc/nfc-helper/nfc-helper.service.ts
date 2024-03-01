import { Injectable } from '@angular/core';
import { NfcUtils } from '@capawesome-team/capacitor-nfc';

@Injectable({
  providedIn: 'root',
})
export class NfcHelperService {
  private readonly nfcUtilsInstance = new NfcUtils();

  constructor() {}

  public convertHexToBytes(hex: string): number[] {
    return this.nfcUtilsInstance.convertHexToBytes({ hex }).bytes;
  }

  public convertBytesToHex(bytes: number[]): string {
    return this.nfcUtilsInstance.convertBytesToHex({ bytes }).hex;
  }

  public convertHexToNumber(hex: string): number {
    return this.nfcUtilsInstance.convertHexToNumber({ hex }).number;
  }
}
