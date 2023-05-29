import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string, position?: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: position || 'bottom',
      color: 'secondary'
    });

    await toast.present();
  }
}
