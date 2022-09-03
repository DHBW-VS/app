import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DialogService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { createComponentMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { DualisUnitFilterPipe } from '../../pipes';
import { DualisAuthService, DualisPageService } from '../../services';
import { DualisPage } from './dualis.page';

describe('DualisPage', () => {
  let component: DualisPage;
  let fixture: ComponentFixture<DualisPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let dualisAuthServiceSpy: jest.Mocked<DualisAuthService>;
  let routerSpy: jest.Mocked<Router>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let dualisPageServiceSpy: jest.Mocked<DualisPageService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    dualisAuthServiceSpy = createSpyObj('DualisAuthService', {
      logout: undefined,
    });
    routerSpy = createSpyObj('Router', { navigate: undefined });
    cdrSpy = createSpyObj('ChangeDetectorRef', { markForCheck: undefined });
    dualisPageServiceSpy = createSpyObj('DualisPageService', {
      getSemesterList: undefined,
      getSemesterByListItem: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [
        DualisPage,
        DualisUnitFilterPipe,
        createComponentMock({ selector: 'app-dualis-semester-select', inputs: ['semesterList'] }),
        createComponentMock({ selector: 'app-dualis-unit-card', inputs: ['unit'] }),
        createComponentMock({ selector: 'app-dualis-semester-gpa-bar', inputs: ['semester'] }),
      ],
      imports: [SharedTestingModule],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: DualisAuthService, useValue: dualisAuthServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        { provide: DualisPageService, useValue: dualisPageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DualisPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    element.remove();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
