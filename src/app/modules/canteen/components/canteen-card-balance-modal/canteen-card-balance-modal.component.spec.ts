import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { CanteenCardBalanceModalComponent } from './canteen-card-balance-modal.component';

describe('CanteenCardBalanceModalComponent', () => {
  let component: CanteenCardBalanceModalComponent;
  let fixture: ComponentFixture<CanteenCardBalanceModalComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanteenCardBalanceModalComponent],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CanteenCardBalanceModalComponent);
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
