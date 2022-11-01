import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class CapacitorAppService {

  constructor() {
    void App.removeAllListeners().then(() => {
      void App.addListener('backButton', ({ canGoBack }) => {
        if(canGoBack){
          window.history.back();
        } else {
          void this.exitApp();
        }
      });
    });
  }

  private async exitApp(): Promise<void> {
    return App.exitApp();
  }
}
