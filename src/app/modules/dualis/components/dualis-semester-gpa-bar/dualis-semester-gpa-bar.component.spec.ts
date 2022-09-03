import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tests/modules';
import { DualisSemesterGpaBarComponent } from './dualis-semester-gpa-bar.component';

describe('DualisSemesterGpaBarComponent', () => {
  let component: DualisSemesterGpaBarComponent;
  let fixture: ComponentFixture<DualisSemesterGpaBarComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DualisSemesterGpaBarComponent],
      imports: [SharedTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DualisSemesterGpaBarComponent);
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

  it('should display ion-footer', () => {
    component.semester = { displayName: '', gpa: '1,5', id: '', totalCredits: '10', units: [] };
    fixture.detectChanges();
    const ionItemElm = element.querySelector('ion-footer');
    expect(ionItemElm).toBeTruthy();
  });

  it('should not display ion-footer', () => {
    const ionItemElm = element.querySelector('ion-footer');
    expect(ionItemElm).toBeNull();
  });

  it('should display the select options', () => {
    const [gpa, totalCredits] = ['1,5', '10'];
    component.semester = { displayName: '', gpa, id: '', totalCredits, units: [] };
    fixture.detectChanges();
    const div = element.querySelectorAll('.content-wrapper');
    const spans = div[0].querySelectorAll('span');
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe('Semester-GPA');
    expect(spans[1].textContent).toBe(`${gpa} (${totalCredits} Credits)`);
  });
});
