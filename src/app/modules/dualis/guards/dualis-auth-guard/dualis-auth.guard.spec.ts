import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Config } from '@app/config';
import { createSpyObj } from '@tests/helpers';
import { DualisSession } from '../../classes';
import { DualisAuthService } from '../../services';
import { DualisAuthGuard } from './dualis-auth.guard';

describe('DualisAuthGuard', () => {
  let dualisAuthGuard: DualisAuthGuard;
  let dualisAuthServiceSpy: jest.Mocked<DualisAuthService>;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(() => {
    dualisAuthServiceSpy = createSpyObj('DualisAuthService', { getSession: undefined });
    routerSpy = createSpyObj('Router', { navigate: undefined });

    TestBed.configureTestingModule({
      providers: [
        DualisAuthGuard,
        { provide: DualisAuthService, useValue: dualisAuthServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    dualisAuthGuard = TestBed.inject(DualisAuthGuard);

    jest.useFakeTimers();
    jest.setSystemTime(new Date(2000, 1, 1, 0, 0, 0, 0));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(dualisAuthGuard).toBeTruthy();
  });

  it('should not activate the route (session is null)', async () => {
    dualisAuthServiceSpy.getSession.mockReturnValue(null);
    const canActivate = dualisAuthGuard.canActivate();
    expect(canActivate).toBeFalsy();
  });

  it('should not activate the route (session is expired)', async () => {
    dualisAuthServiceSpy.getSession.mockReturnValue(new DualisSession('123'));
    jest.advanceTimersByTime(Config.dualisTokenExpirationTimeMs + 1);
    const canActivate = dualisAuthGuard.canActivate();
    expect(canActivate).toBe(false);
  });

  it('should activate the route', async () => {
    dualisAuthServiceSpy.getSession.mockReturnValue(new DualisSession('123'));
    const canActivate = dualisAuthGuard.canActivate();
    expect(canActivate).toBe(true);
  });
});
