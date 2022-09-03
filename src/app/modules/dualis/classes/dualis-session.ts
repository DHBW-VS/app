import { Config } from '@app/config';

export class DualisSession {
  private readonly _key: string;
  private _expirationDate: Date;

  constructor(key: string) {
    this._key = key;
    this._expirationDate = this.getExpirationDate();
  }

  public get key(): string {
    return this._key;
  }

  public get expirationDate(): Date {
    return this._expirationDate;
  }

  public isExpired(): boolean {
    return this._expirationDate < new Date();
  }

  public resetExpirationDate(): void {
    this._expirationDate = this.getExpirationDate();
  }

  private getExpirationDate(): Date {
    return new Date(Date.now() + Config.dualisTokenExpirationTimeMs);
  }
}
