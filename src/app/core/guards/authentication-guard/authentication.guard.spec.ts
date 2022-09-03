import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { AuthenticationGuard } from './authentication.guard';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let moodleAuthServiceSpy: jest.Mocked<AuthenticationService>;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(() => {
    moodleAuthServiceSpy = createSpyObj('AuthenticationService', {
      isAuthenticated: undefined,
    });
    routerSpy = createSpyObj('Router', {
      navigate: undefined,
    });

    TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        { provide: AuthenticationService, useValue: moodleAuthServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not activate the route', async () => {
    moodleAuthServiceSpy.isAuthenticated.mockReturnValue(false);
    const canActivate = await guard.canActivate();
    expect(canActivate).toBe(false);
  });

  it('should activate the route', async () => {
    moodleAuthServiceSpy.isAuthenticated.mockReturnValue(true);
    const canActivate = await guard.canActivate();
    expect(canActivate).toBe(true);
  });
});
