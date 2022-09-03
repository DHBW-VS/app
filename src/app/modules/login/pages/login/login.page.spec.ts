import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService, DialogService } from '@app/core';
import { MenuController } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let menuControllerSpy: jest.Mocked<MenuController>;
  let routerSpy: jest.Mocked<Router>;
  let authenticationServiceSpy: jest.Mocked<AuthenticationService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    menuControllerSpy = createSpyObj('MenuController', {
      enable: undefined,
    });
    routerSpy = createSpyObj('Router', {
      navigate: undefined,
    });
    authenticationServiceSpy = createSpyObj('AuthenticationService', {
      login: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [SharedTestingModule],
      providers: [
        { provide: MenuController, useValue: menuControllerSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthenticationService, useValue: authenticationServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
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
