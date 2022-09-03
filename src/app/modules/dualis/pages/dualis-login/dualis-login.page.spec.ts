import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DialogService, StorageService } from '@app/core';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { createDialogServiceSpy } from '@tests/spies';
import { DualisAuthService } from '../../services';
import { DualisLoginPage } from './dualis-login.page';

describe('DualisLoginPage', () => {
  let component: DualisLoginPage;
  let fixture: ComponentFixture<DualisLoginPage>;
  let element: HTMLElement;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let dualisAuthServiceSpy: jest.Mocked<DualisAuthService>;
  let routerSpy: jest.Mocked<Router>;
  let storageServiceSpy: jest.Mocked<StorageService>;

  beforeEach(async () => {
    dialogServiceSpy = createDialogServiceSpy();
    dualisAuthServiceSpy = createSpyObj('DualisAuthService', { login: undefined });
    routerSpy = createSpyObj('Router', { navigate: undefined });
    storageServiceSpy = createSpyObj('StorageService', { retrieveData: undefined, clearStorage: undefined });

    await TestBed.configureTestingModule({
      declarations: [DualisLoginPage],
      imports: [SharedTestingModule],
      providers: [
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DualisAuthService, useValue: dualisAuthServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DualisLoginPage);
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

  it('should be a valid input', () => {
    component.loginFormGroup.setValue({
      username: 'username',
      password: 'password',
      storeUsername: false,
    });
    expect(component.loginFormGroup.valid).toBeTruthy();
  });

  it('should be an invalid input', () => {
    component.loginFormGroup.setValue({
      username: '',
      password: '',
      storeUsername: false,
    });
    expect(component.loginFormGroup.valid).toBeFalsy();
    component.loginFormGroup.setValue({
      username: 'username',
      password: '',
      storeUsername: false,
    });
    expect(component.loginFormGroup.valid).toBeFalsy();
    component.loginFormGroup.setValue({
      username: '',
      password: 'password',
      storeUsername: false,
    });
    expect(component.loginFormGroup.valid).toBeFalsy();
  });
});
