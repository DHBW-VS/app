import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiCanteenService, DialogService, NotificationService, StorageService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { createComponentMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { CanteenPage } from './canteen.page';

describe('CanteenPage', () => {
  let component: CanteenPage;
  let fixture: ComponentFixture<CanteenPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let storageServiceSpy: jest.Mocked<StorageService>;
  let apiCanteenServiceSpy: jest.Mocked<ApiCanteenService>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    storageServiceSpy = createSpyObj('StorageService', { storeData: undefined, retrieveData: undefined });
    apiCanteenServiceSpy = createSpyObj('ApiCanteenService', { findAll: undefined });
    cdrSpy = createSpyObj('ChangeDetectorRef', { markForCheck: undefined });
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [CanteenPage, createComponentMock({ selector: 'app-canteen-dish-card', inputs: ['dish'] })],
      imports: [SharedTestingModule],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ApiCanteenService, useValue: apiCanteenServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanteenPage);
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
