import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ModalOptions, PopoverOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
  ) {}

  public async showAlert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create(options);
    await alert.present();
    return alert;
  }

  public async showErrorAlert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const defaultOptions: AlertOptions = {
      header: 'Fehlgeschlagen',
      buttons: ['OK'],
    };
    options = { ...defaultOptions, ...options };
    return this.showAlert(options);
  }

  public async showModal(options: ModalOptions): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create(options);
    await modal.present();
    return modal;
  }

  public async dismissModal(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.modalCtrl.dismiss(data, role, id);
  }

  public async showPopover(options: PopoverOptions): Promise<HTMLIonPopoverElement> {
    const popover = await this.popoverCtrl.create(options);
    await popover.present();
    return popover;
  }

  public async dismissPopover(data?: any, role?: string, id?: string): Promise<boolean> {
    return this.popoverCtrl.dismiss(data, role, id);
  }

  public async showLoading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const defaultOptions: LoadingOptions = {
      message: 'Bitte warten...',
    };
    options = { ...defaultOptions, ...options };
    const loading = await this.loadingCtrl.create(options);
    await loading.present();
    return loading;
  }
}
