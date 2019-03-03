import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CrudService } from '../services/crud/crud.service';
import { MenuPage } from '../menu/menu.page';

@Component({
  selector: 'app-false',
  templateUrl: './false.page.html',
  styleUrls: ['./false.page.scss'],
})
export class FalsePage implements OnInit {

  parkings : any;

  constructor(public modalController: ModalController, public crud: CrudService, public loadingCtrl: LoadingController, public alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getParkings();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    return await loading.present();
  }

  getParkings() {
    this.presentLoading();
    this.crud.viewParkings().then((res) => {
      console.log('data: ' + res);
      this.parkings = res;
      this.loadingCtrl.dismiss();
    });
  }


  async warn() {
    return new Promise(async (resolve) => {
      const confirm = await this.alertController.create({
        header: 'Alert',
        message: 'Are you sure you want to delete the parking?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            },
          },
          {
            text: 'OK',
            handler: () => {
              return resolve(true);
            },
          },
        ],
      });

      await confirm.present();
    });
  }

  async deleteParking(id) {
    this.warn().then((res) => {
      if (res) {
        this.crud.deleteParking(id).then((res) => {
          this.getParkings();
        })
      }
    });

  }
  
}
