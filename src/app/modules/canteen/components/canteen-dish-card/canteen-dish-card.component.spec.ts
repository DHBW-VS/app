import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createPipeMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { CanteenDishCardComponent } from './canteen-dish-card.component';

describe('CanteenDishComponent', () => {
  let component: CanteenDishCardComponent;
  let fixture: ComponentFixture<CanteenDishCardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanteenDishCardComponent, createPipeMock({ name: 'canteenFoodLabel' })],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CanteenDishCardComponent);
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
