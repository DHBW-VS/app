import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { CanteenMenuPopoverComponent } from './canteen-menu-popover.component';

describe('CanteenMenuPopoverComponent', () => {
  let component: CanteenMenuPopoverComponent;
  let fixture: ComponentFixture<CanteenMenuPopoverComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanteenMenuPopoverComponent],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CanteenMenuPopoverComponent);
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
