import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiMoodleNewsService, DialogService, NotificationService, StorageService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { MoodleNewsCardComponent } from './moodle-news-card.component';

describe('MoodleNewsCardComponent', () => {
  let component: MoodleNewsCardComponent;
  let fixture: ComponentFixture<MoodleNewsCardComponent>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let apiMoodleNewsServiceSpy: jest.Mocked<ApiMoodleNewsService>;
  let storageServiceSpy: jest.Mocked<StorageService>;
  let cdrSpy: jest.Mocked<ChangeDetectorRef>;
  let notificationServiceSpy: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    apiMoodleNewsServiceSpy = createSpyObj('ApiMoodleNewsService', { findAll: undefined });
    storageServiceSpy = createSpyObj('StorageService', {
      retrieveData: Promise.resolve(),
    });
    cdrSpy = createSpyObj('ChangeDetectorRef', {
      markForCheck: undefined,
    });
    notificationServiceSpy = createSpyObj('NotificationService', { showToast: undefined });

    await TestBed.configureTestingModule({
      declarations: [MoodleNewsCardComponent],
      imports: [SharedTestingModule],
      providers: [
        { provide: ApiMoodleNewsService, useValue: apiMoodleNewsServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodleNewsCardComponent);
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
