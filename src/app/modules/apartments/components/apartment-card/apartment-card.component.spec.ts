import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogService } from '@app/core';
import { createPipeMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { ApartmentCardComponent } from './apartment-card.component';

describe('ApartmentCardComponent', () => {
  let component: ApartmentCardComponent;
  let fixture: ComponentFixture<ApartmentCardComponent>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();

    await TestBed.configureTestingModule({
      declarations: [ApartmentCardComponent, createPipeMock({ name: 'apartmentDate' })],
      imports: [SharedTestingModule],
      providers: [{ provide: DialogService, useValue: dialogServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentCardComponent);
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
