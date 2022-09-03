import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { SosPage } from './sos.page';

describe('SosPage', () => {
  let component: SosPage;
  let fixture: ComponentFixture<SosPage>;
  let element: HTMLElement;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [SosPage],
      imports: [SharedTestingModule],
      providers: [{ provide: NotificationService, useValue: notificationServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(SosPage);
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
