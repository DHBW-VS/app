import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiContactsService, DialogService, NotificationService, StorageService, UserService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { createComponentMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { ContactGroupFilterPipe } from '../../pipes';
import { ContactsPage } from './contacts.page';

describe('ContactsPage', () => {
  let component: ContactsPage;
  let fixture: ComponentFixture<ContactsPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let storageServiceSpy: jest.Mocked<StorageService>;
  let userServiceSpy: jest.Mocked<UserService>;
  let apiContactsServiceSpy: jest.Mocked<ApiContactsService>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    storageServiceSpy = createSpyObj('StorageService', { storeData: undefined, retrieveData: undefined });
    userServiceSpy = createSpyObj('UserService', { getCourse: undefined });
    apiContactsServiceSpy = createSpyObj('ApiContactsService', { findAll: undefined });
    cdrSpy = createSpyObj('ChangeDetectorRef', { markForCheck: undefined });
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [
        ContactsPage,
        ContactGroupFilterPipe,
        createComponentMock({ selector: 'app-contact-card', inputs: ['contact'] }),
      ],
      imports: [SharedTestingModule],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ApiContactsService, useValue: apiContactsServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsPage);
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
