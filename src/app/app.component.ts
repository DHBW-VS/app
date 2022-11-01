import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MenuController, Platform } from '@ionic/angular';
import { CapacitorAppService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private readonly platform: Platform,
    private readonly menuController: MenuController,
    private readonly router: Router,
    // Do NOT remove the following services:
    private readonly capacitorAppService: CapacitorAppService,
  ) {
    void this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    await this.platform.ready();
    const isCapacitor = this.platform.is('capacitor');
    if (isCapacitor) {
      const statusBarPromise = this.configureStatusBar();
      const splashScreenPromise = this.hideSplashScreen();
      await Promise.all([statusBarPromise, splashScreenPromise]);
    }
  }

  private async configureStatusBar(): Promise<void> {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const color = prefersDark.matches ? '#000000' : '#e2001a';
    const isAndroid = this.platform.is('android');
    if (isAndroid) {
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setBackgroundColor({ color });
    }
    await StatusBar.setStyle({ style: Style.Dark });
  }

  private hideSplashScreen(): Promise<void> {
    return SplashScreen.hide();
  }

  public async openPage(page: string): Promise<boolean> {
    void this.menuController.close();
    return this.router.navigateByUrl(page);
  }

  public async pushPage(page: string): Promise<boolean> {
    void this.menuController.close();
    return this.router.navigateByUrl(page, { skipLocationChange: true });
  }

  public openWindow(url: string): any {
    return window.open(url, '_self');
  }
}
