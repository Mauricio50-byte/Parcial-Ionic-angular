import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoaderProvider {
  constructor(private loadingController: LoadingController) { }
  
    async present(menssage: string = 'cargando...') {
    const loading = await this.loadingController.create({
      message: menssage,
      spinner: 'bubbles'
    });
    await loading.present();
    return loading;
  }
  
    async dismiss(){
      return await this.loadingController.dismiss();
    }
}
