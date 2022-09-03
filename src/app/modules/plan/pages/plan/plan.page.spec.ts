import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DialogService, NotificationService, StorageService, UserService } from '@app/core';
import { NavController } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { PlanService } from '../../services';
import { PlanPage } from './plan.page';

describe('PlanPage', () => {
  let component: PlanPage;
  let fixture: ComponentFixture<PlanPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let planServiceSpy: jest.Mocked<PlanService>;
  let storageServiceSpy: jest.Mocked<StorageService>;
  let userServiceSpy: jest.Mocked<UserService>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    planServiceSpy = createSpyObj('PlanService', { getLastOpenedTimetable: undefined, getTimetableList: undefined });
    storageServiceSpy = createSpyObj('StorageService', { storeData: undefined, retrieveData: undefined });
    userServiceSpy = createSpyObj('UserService', { isStudent: () => true });
    cdrSpy = createSpyObj('ChangeDetectorRef', { markForCheck: undefined });
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [PlanPage],
      imports: [SharedTestingModule],
      providers: [
        { provide: PlanService, useValue: planServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NavController, useValue: {} },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanPage);
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
