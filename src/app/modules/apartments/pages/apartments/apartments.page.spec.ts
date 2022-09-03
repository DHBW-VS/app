import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiApartmentsService, DialogService, NotificationService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { createComponentMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { ApartmentsPage } from './apartments.page';

describe('ApartmentsPage', () => {
  let component: ApartmentsPage;
  let fixture: ComponentFixture<ApartmentsPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let apiApartmentsService: jest.Mocked<ApiApartmentsService>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    apiApartmentsService = createSpyObj('ApiApartmentsService', {
      findAllSearches: undefined,
      findAllOffers: undefined,
    });
    cdrSpy = createSpyObj('ChangeDetectorRef', { markForCheck: undefined });
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [ApartmentsPage, createComponentMock({ selector: 'app-apartment-card', inputs: ['apartment'] })],
      imports: [SharedTestingModule],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ApiApartmentsService, useValue: apiApartmentsService },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentsPage);
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
