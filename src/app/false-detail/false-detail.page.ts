import { Component, OnInit } from '@angular/core';

import { MenuPage } from '../menu/menu.page';
import { AlertController, ModalController } from '@ionic/angular';
import { GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker} from '@ionic-native/google-maps';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-false-detail',
  templateUrl: './false-detail.page.html',
  styleUrls: ['./false-detail.page.scss'],
})
export class FalseDetailPage implements OnInit {

  map: GoogleMap;
  img: string = "../../assets/images/dummy-image.jpg";
  value: string;

  constructor(public alertController: AlertController, public modalController: ModalController, private photoLibrary: PhotoLibrary, private camera: Camera, public pickerCtrl: PickerController) { }

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      buttons: [{
        text: 'Fertig',
      }],
      columns: [
        {
          name: 'days',
          options: [
            {
              text: '19,00 EUR, Standard',
              value: 1,
            },
            {
              text: '39,90 EUR, Spezial',
              value: 2
            },
            {
              text: '3',
              value: 3
            },
          ]
        },
      ]
    });
    await picker.present();

  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.img = base64Image;
    }, (err) => {
      // Handle error
      this.presentAlert();
    });
  }

  clickPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.img = base64Image;
    }, (err) => {
      this.presentAlert();
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error!',
      message: 'The image could not load. Please try again.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

}
