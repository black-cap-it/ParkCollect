import { Component, OnInit } from '@angular/core';
import { MenuPage } from '../menu/menu.page';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { CrudService } from '../services/crud/crud.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  parkings: any;
  result: boolean = false;

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

  getParkings() {
    this.presentLoading();
    this.crud.viewParkings().then((res) => {
      console.log('data: ' + res);
      this.parkings = res;
      this.loadingCtrl.dismiss();
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
