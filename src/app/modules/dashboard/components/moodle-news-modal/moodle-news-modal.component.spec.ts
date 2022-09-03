import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '@app/core';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { MoodleNewsModalComponent } from './moodle-news-modal.component';

describe('MoodleNewsModalComponent', () => {
  let component: MoodleNewsModalComponent;
  let fixture: ComponentFixture<MoodleNewsModalComponent>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();

    await TestBed.configureTestingModule({
      declarations: [MoodleNewsModalComponent],
      imports: [SharedTestingModule],
      providers: [{ provide: DialogService, useValue: dialogServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MoodleNewsModalComponent);
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
