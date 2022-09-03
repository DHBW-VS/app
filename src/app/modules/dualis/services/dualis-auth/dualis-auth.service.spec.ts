import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Config } from '@app/config';
import { DualisAuthService } from './dualis-auth.service';

describe('DualisAuthService', () => {
  let service: DualisAuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(DualisAuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should log in successfully', async () => {
    const sessionKey = '111222333444555';
    const mockResponseOptions = {
      headers: {
        refresh: `0; URL=/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=STARTPAGE_DISPATCH&ARGUMENTS=-N${sessionKey},-N000311,-N000000000000000`,
      },
      status: 200,
      statusText: 'OK',
    };
    const promise = service.login('username', 'password');
    void promise.then(successful => {
      expect(successful).toBeTruthy();
      const session = service.getSession();
      expect(session).toBeTruthy();
      expect(session?.key).toBe(sessionKey);
    });
    const url = [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join('');
    httpTestingController.expectOne(url).flush('', mockResponseOptions);
    await promise;
  });

  xit('should not log in successfully', async () => {
    const mockResponseOptions = {
      headers: {
        refresh: '0; URL=/scripts/mgrqispi.dll',
      },
      status: 200,
      statusText: 'OK',
    };
    const promise = service.login('username', 'password');
    void promise.then(successful => {
      expect(successful).toBe(false);
      const session = service.getSession();
      expect(session).toBeFalsy();
    });
    const url = [Config.dualisBaseUrl, '/scripts/mgrqispi.dll'].join('');
    httpTestingController.expectOne(url).flush({}, mockResponseOptions);
    await promise;
  });
});
