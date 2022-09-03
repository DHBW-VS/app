import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { DualisEmptyStringPipe, DualisGradePipe } from '../../pipes';
import { DualisUnitCardComponent } from './dualis-unit-card.component';

describe('DualisUnitCardComponent', () => {
  let component: DualisUnitCardComponent;
  let fixture: ComponentFixture<DualisUnitCardComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DualisUnitCardComponent, DualisEmptyStringPipe, DualisGradePipe],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DualisUnitCardComponent);
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

  it('should display ion-card', () => {
    component.unit = {
      id: '111222111222111',
      displayName: 'Wissenschaftliches Arbeiten',
      no: 'WWI_100',
      status: 'bestanden',
      credits: '5,0',
      finalGrade: 'b',
      exams: undefined,
    };
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-card');
    expect(ionItemElm).toBeTruthy();
  });

  it('should not display ion-card', () => {
    component.unit = undefined;
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-card');
    expect(ionItemElm).toBeNull();
  });
});
