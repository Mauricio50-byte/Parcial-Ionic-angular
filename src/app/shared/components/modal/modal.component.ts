import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { News } from '../../../interfaces/news.interface';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() news!: News;

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss();
  }

  async openInBrowser() {
    await Browser.open({ url: this.news.url });
  }
}