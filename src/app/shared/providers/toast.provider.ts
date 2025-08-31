import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastProvider {

  constructor(private toastController: ToastController) { }

  async present(message: string, duration: number = 2000, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}