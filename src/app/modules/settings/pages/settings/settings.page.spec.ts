import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@app/core';
import { NavController } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let element: HTMLElement;
  let authenticationServiceSpy: jest.Mocked<AuthenticationService>;
  let navCtrlSpy: jest.Mocked<NavController>;

  beforeEach(async () => {
    authenticationServiceSpy = createSpyObj('AuthenticationService', { logout: undefined });
    navCtrlSpy = createSpyObj('NavController', { navigateRoot: undefined });

    await TestBed.configureTestingModule({
      declarations: [SettingsPage],
      imports: [SharedTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPage);
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
