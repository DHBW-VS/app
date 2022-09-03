import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface CreateTokenDto {
  grantType: 'password' | 'refreshToken';
  username?: string;
  password?: string;
  refreshToken?: string;
}

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
  expiredAt: number;
}

export interface RevokeTokenDto {
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private readonly urlPath = '/auth';

  constructor(private readonly httpClient: HttpClient) {}

  public async token(createTokenDto: CreateTokenDto): Promise<TokenDto> {
    const response$ = this.httpClient.post<TokenDto>(environment.apiBaseUrl + this.urlPath + '/token', createTokenDto);
    return lastValueFrom(response$);
  }

  public async revoke(revokeRequestDto: RevokeTokenDto): Promise<void> {
    const response$ = this.httpClient.post<void>(environment.apiBaseUrl + this.urlPath + '/revoke', revokeRequestDto);
    return lastValueFrom(response$);
  }
}
