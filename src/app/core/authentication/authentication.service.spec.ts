import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SessionRepository } from '@app/store';
import { createSpyObj } from '@tests/helpers';
import { ApiAuthService } from '../services/api';
import { StorageService } from '../services/storage/storage.service';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let storageServiceSpy: jest.Mocked<StorageService>;
  let apiAuthServiceSpy: jest.Mocked<ApiAuthService>;
  let sessionRepositorySpy: jest.Mocked<SessionRepository>;

  beforeEach(() => {
    storageServiceSpy = createSpyObj('StorageService', {
      retrieveData: undefined,
      clearStorage: undefined,
    });
    apiAuthServiceSpy = createSpyObj('ApiAuthService', {
      token: undefined,
    });
    sessionRepositorySpy = createSpyObj('SessionRepository', {
      setAccessToken: undefined,
      getAccessToken: undefined,
      setRefreshToken: undefined,
      getRefreshToken: undefined,
      setUser: undefined,
      clear: undefined,
    });

    TestBed.configureTestingModule({
      providers: [
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ApiAuthService, useValue: apiAuthServiceSpy },
        { provide: SessionRepository, useValue: sessionRepositorySpy },
      ],
    });

    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be authenticated', async () => {
    sessionRepositorySpy.getAccessToken.mockReturnValue('test');
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBe(true);
  });

  it('should not be authenticated', async () => {
    storageServiceSpy.retrieveData.mockReturnValue(Promise.resolve(null));
    const isAuthenticated = await service.isAuthenticated();
    expect(isAuthenticated).toBe(false);
  });

  it('should return true on log in', async () => {
    apiAuthServiceSpy.token.mockImplementation(() =>
      Promise.resolve({ accessToken: 'test', refreshToken: 'test', expiredAt: Date.now() }),
    );
    const result = await service.login('test', 'test');
    expect(result).toBe(true);
  });

  it('should return false on log in', async () => {
    apiAuthServiceSpy.token.mockImplementation(() => {
      throw new HttpErrorResponse({ status: 401 });
    });
    const result = await service.login('test', 'test');
    expect(result).toBe(false);
  });

  it('should return error on log in', async () => {
    const error = new HttpErrorResponse({ status: 500 });
    apiAuthServiceSpy.token.mockImplementation(() => {
      throw error;
    });
    const result = service.login('test', 'test');
    await expect(result).rejects.toEqual(error);
  });

  it('should clear the storage on log out', async () => {
    service.logout();
    expect(sessionRepositorySpy.clear).toHaveBeenCalledTimes(1);
    expect(storageServiceSpy.clearStorage).toHaveBeenCalledTimes(1);
  });
});
