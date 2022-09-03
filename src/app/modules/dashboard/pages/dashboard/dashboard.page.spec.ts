import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuController } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { createComponentMock } from '@tests/mocks';
import { SharedTestingModule } from '@tests/modules';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let element: HTMLElement;
  let menuControllerSpy: jest.Mocked<MenuController>;

  beforeEach(async () => {
    menuControllerSpy = createSpyObj('MenuController', { enable: undefined });

    await TestBed.configureTestingModule({
      declarations: [DashboardPage, createComponentMock({ selector: 'app-moodle-news-card' })],
      imports: [SharedTestingModule],
      providers: [{ provide: MenuController, useValue: menuControllerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
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
