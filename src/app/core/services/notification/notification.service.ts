import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly toastController: ToastController) {}

  public async showToast(options: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create(options);
    await toast.present();
    return toast;
  }

  public async dismissToast(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.toastController.dismiss(data, role, id);
  }
}
