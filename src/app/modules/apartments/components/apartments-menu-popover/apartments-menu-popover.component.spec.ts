import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { ApartmentsMenuPopoverComponent } from './apartments-menu-popover.component';

describe('ApartmentsMenuPopoverComponent', () => {
  let component: ApartmentsMenuPopoverComponent;
  let fixture: ComponentFixture<ApartmentsMenuPopoverComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentsMenuPopoverComponent],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentsMenuPopoverComponent);
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
