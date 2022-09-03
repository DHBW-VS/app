import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService, NotificationService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { createPipeMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { ApartmentModalComponent } from './apartment-modal.component';

describe('ApartmentModalComponent', () => {
  let component: ApartmentModalComponent;
  let fixture: ComponentFixture<ApartmentModalComponent>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    notificationServiceSpy = createSpyObj('NotificationService', {
      showToast: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [ApartmentModalComponent, createPipeMock({ name: 'apartmentDate' })],
      imports: [SharedTestingModule],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentModalComponent);
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
