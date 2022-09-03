import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { SharedTestingModule } from '@tests/modules';
import { createPlatformSpy } from '@tests/spies';
import { when } from 'jest-when';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let platformSpy: jest.Mocked<Platform>;
  let menuControllerSpy: jest.Mocked<MenuController>;
  let routerSpy: jest.Mocked<Router>;

  beforeEach(async () => {
    SplashScreen.hide = jest.fn().mockResolvedValue({});
    StatusBar.setOverlaysWebView = jest.fn().mockReturnValue(Promise.resolve());
    StatusBar.setBackgroundColor = jest.fn().mockReturnValue(Promise.resolve());
    StatusBar.setStyle = jest.fn().mockReturnValue(Promise.resolve());
    platformSpy = createPlatformSpy();
    menuControllerSpy = createSpyObj('MenuController', {
      close: undefined,
    });
    routerSpy = createSpyObj('Router', {
      navigateByUrl: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [SharedTestingModule, RouterTestingModule],
      providers: [
        { provide: Platform, useValue: platformSpy },
        { provide: MenuController, useValue: menuControllerSpy },
        { provide: NavController, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize the app', fakeAsync(() => {
    TestBed.createComponent(AppComponent);
    flush();
    expect(platformSpy.ready).toHaveBeenCalledTimes(1);
  }));

  it('should configure the status bar', fakeAsync(() => {
    when(platformSpy.is).calledWith('capacitor').mockReturnValue(true);
    when(platformSpy.is).calledWith('android').mockReturnValue(true);
    TestBed.createComponent(AppComponent);
    flush();
    expect(platformSpy.ready).toHaveBeenCalledTimes(1);
    expect(StatusBar.setOverlaysWebView).toHaveBeenCalledWith({ overlay: false });
    expect(StatusBar.setBackgroundColor).toHaveBeenCalledTimes(1);
  }));

  it('should hide the splash screen', fakeAsync(() => {
    when(platformSpy.is).calledWith('capacitor').mockReturnValue(true);
    TestBed.createComponent(AppComponent);
    flush();
    expect(platformSpy.ready).toHaveBeenCalledTimes(1);
    expect(SplashScreen.hide).toHaveBeenCalledTimes(1);
  }));
});
