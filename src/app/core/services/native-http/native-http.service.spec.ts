import { TestBed } from '@angular/core/testing';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { createSpyObj } from '@tests/helpers';
import { NativeHttpService } from './native-http.service';

describe('NativeHttpService', () => {
  let service: NativeHttpService;
  let httpSpy: jest.Mocked<HTTP>;

  beforeEach(() => {
    httpSpy = createSpyObj('HTTP', {
      setRequestTimeout: undefined,
      sendRequest: undefined,
      ErrorCode: undefined,
    });
    TestBed.configureTestingModule({
      providers: [{ provide: HTTP, useValue: httpSpy }],
    });
    service = TestBed.inject(NativeHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
