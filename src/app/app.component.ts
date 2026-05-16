import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MenuController } from '@ionic/angular';
import { CapacitorAppService, CapacitorLiveUpdateService, DialogService, TimeoutService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private readonly menuController: MenuController,
    private readonly timeoutService: TimeoutService,
    private readonly capacitorLiveUpdateService: CapacitorLiveUpdateService,
    private readonly dialogService: DialogService,
    // Do NOT remove the following services:
    private readonly capacitorAppService: CapacitorAppService,
  ) {
    this.initializeLiveUpdate();
    void this.initializeApp();
  }

  public async closeMenu(): Promise<void> {
    await this.menuController.close();
  }

  public openWindow(url: string): any {
    return window.open(url, '_self');
  }

  private initializeLiveUpdate(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    void this.capacitorLiveUpdateService.ready();
    this.capacitorLiveUpdateService.nextBundleSet$.subscribe(async event => {
      if (!event.bundleId) {
        return;
      }
      const confirmed = await this.dialogService.showConfirmAlert({
        header: 'Update verfügbar',
        message: 'Eine neue Version der App ist verfügbar. Möchtest du das Update jetzt installieren?',
      });
      if (confirmed) {
        await this.capacitorLiveUpdateService.reload();
      }
    });
  }

  private async initializeApp(): Promise<void> {
    const isNativePlatform = Capacitor.isNativePlatform();
    if (isNativePlatform) {
      await SplashScreen.hide();
      // We need to add a timeout since `SplashScreen.hide()` resolves
      // before the splash screen is actually hidden.
      await this.timeoutService.timeout(500);
      const isAndroid = Capacitor.getPlatform() === 'android';
      if (isAndroid) {
        await StatusBar.setStyle({ style: Style.Dark });
      }
    }
  }
}
