import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { createSpyObj } from '@tests/helpers';
import { DualisSession } from '../../classes';
import { DualisAuthService } from '../dualis-auth/dualis-auth.service';
import { DualisHtmlParserService } from '../dualis-html-parser/dualis-html-parser.service';
import { DualisPageService } from './dualis-page.service';

describe('DualisPageService', () => {
  let service: DualisPageService;
  let httpTestingController: HttpTestingController;
  let dualisAuthServiceSpy: jest.Mocked<DualisAuthService>;
  let dualisHtmlParserServiceSpy: jest.Mocked<DualisHtmlParserService>;

  beforeEach(() => {
    dualisHtmlParserServiceSpy = createSpyObj('DualisHtmlParserService', {
      parseSemesterList: undefined,
      parseSemesterCredits: undefined,
      parseSemesterGpa: undefined,
      parseUnits: undefined,
      parseExams: undefined,
    });
    dualisAuthServiceSpy = createSpyObj('AuthenticationService', {
      getSession: new DualisSession('123'),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: DualisHtmlParserService, useValue: dualisHtmlParserServiceSpy },
        { provide: DualisAuthService, useValue: dualisAuthServiceSpy },
      ],
    });

    service = TestBed.inject(DualisPageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
