import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiParkingService, NotificationService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { createComponentMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { ParkingPage } from './parking.page';

describe('ParkingPage', () => {
  let component: ParkingPage;
  let fixture: ComponentFixture<ParkingPage>;
  let element: HTMLElement;
  let apiParkingServiceSpy: jest.Mocked<ApiParkingService>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    apiParkingServiceSpy = createSpyObj('ApiParkingService', { findAll: undefined });
    cdrSpy = createSpyObj('ChangeDetectorRef', { markForCheck: undefined });
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined, dismissToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [ParkingPage, createComponentMock({ selector: 'app-parking-card', inputs: ['parking'] })],
      imports: [SharedTestingModule],
      providers: [
        { provide: ApiParkingService, useValue: apiParkingServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ParkingPage);
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
