import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAuthService } from '@app/core/services';
import { SessionRepository } from '@app/store';
import { StorageService } from '../services/storage/storage.service';

const LOGTAG = '[AuthenticationService]';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly apiAuthService: ApiAuthService,
    private readonly sessionRepository: SessionRepository,
    private readonly storageService: StorageService,
  ) {}

  public async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await this.apiAuthService.token({
        grantType: 'password',
        username,
        password,
      });
      const payload = this.getPayloadFromAccessToken(response.accessToken);
      this.sessionRepository.setAccessToken(response.accessToken);
      this.sessionRepository.setRefreshToken(response.refreshToken);
      if (payload) {
        this.sessionRepository.setUser({ ...payload.user, username });
      }
      return true;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return false;
      }
      throw error;
    }
  }

  public logout(): void {
    const refreshToken = this.sessionRepository.getRefreshToken();
    if (refreshToken) {
      void this.apiAuthService
        .revoke({
          refreshToken,
        })
        .catch(error => {
          console.error(`${LOGTAG} Error occurred during logout: ${error}`);
        });
    }
    this.clearSession();
  }

  public async refreshSession(): Promise<void> {
    const refreshToken = this.sessionRepository.getRefreshToken();
    const response = await this.apiAuthService.token({
      grantType: 'refreshToken',
      refreshToken,
    });
    this.sessionRepository.setAccessToken(response.accessToken);
    this.sessionRepository.setRefreshToken(response.refreshToken);
  }

  public isAuthenticated(): boolean {
    const accessToken = this.sessionRepository.getAccessToken();
    return !!accessToken;
  }

  private clearSession(): void {
    this.sessionRepository.clear();
    void this.storageService.clearStorage();
  }

  private getPayloadFromAccessToken(accessToken: string): Payload | undefined {
    try {
      return JSON.parse(window.atob(accessToken.split('.')[1]));
    } catch {
      return undefined;
    }
  }
}

interface Payload {
  exp: number;
  iat: number;
  user: { firstname: string; lastname: string; course?: string; isStudent: boolean };
}
