import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MenuPage } from '../menu/menu.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

}
