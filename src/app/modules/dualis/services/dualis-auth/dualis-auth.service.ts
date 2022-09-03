import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import { lastValueFrom } from 'rxjs';
import { DualisSession } from '../../classes';

@Injectable({
  providedIn: 'root',
})
export class DualisAuthService {
  private session: DualisSession | null = null;

  constructor(private readonly httpClient: HttpClient) {}

  public async login(username: string, password: string): Promise<boolean> {
    await this.setRequiredSessionCookie();
    const sessionKey = await this.sendLoginRequest(username, password);
    if (!sessionKey) {
      return false;
    }
    this.startSession(sessionKey);
    return true;
  }

  public async logout(): Promise<void> {
    if (!this.session) {
      return;
    }
    await this.sendLogoutRequest(this.session.key);
    return this.clearSession();
  }

  public getSession(): DualisSession | null {
    return this.session;
  }

  private startSession(sessionKey: string): void {
    this.session = new DualisSession(sessionKey);
  }

  private clearSession(): void {
    this.session = null;
  }

  private async setRequiredSessionCookie(): Promise<void> {
    const url = [
      Config.dualisBaseUrl,
      '/scripts/mgrqispi.dll',
      '?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000324,-Awelcome',
    ].join('');
    const response$ = this.httpClient.get<string>(url);
    await lastValueFrom(response$);
  }

  private async sendLoginRequest(username: string, password: string): Promise<string | null> {
    const formData = new FormData();
    formData.append('usrname', username);
    formData.append('pass', password);
    formData.append('APPNAME', 'CampusNet');
    formData.append('PRGNAME', 'LOGINCHECK');
    formData.append('ARGUMENTS', 'clino,usrname,pass,menuno,persno,browser,platform');
    formData.append('clino', '000000000000001');
    formData.append('browser', '');
    formData.append('platform', '');
    formData.append('menuno', '000324');
    formData.append('persno', '00000000');
    const headers: { [name: string]: string } = {
      'Content-Type': 'multipart/form-data; charset=UTF-8',
    };
    const url = [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join('');
    const response$ = this.httpClient.post(url, formData, { headers: headers, observe: 'response' });
    const response = await lastValueFrom(response$);
    return this.getSessionKeyFromHttpResponse(response);
  }

  private async sendLogoutRequest(sessionKey: string): Promise<void> {
    const url = [
      Config.dualisBaseUrl,
      '/scripts/mgrqispi.dll',
      `?APPNAME=CampusNet&PRGNAME=LOGOUT&ARGUMENTS=-N${sessionKey},-N001`,
    ].join('');
    const response$ = this.httpClient.get<string>(url);
    await lastValueFrom(response$);
  }

  private getSessionKeyFromHttpResponse(response: HttpResponse<any>): string | null {
    const refreshHeader = response.headers.get('refresh');
    if (!refreshHeader?.indexOf('STARTPAGE_DISPATCH')) {
      return null;
    }
    const refreshHeaderRegex = refreshHeader.match(/ARGUMENTS=-N\d+,/);
    return refreshHeaderRegex ? refreshHeaderRegex[0].replace('ARGUMENTS=-N', '').replace(',', '') : null;
  }
}
