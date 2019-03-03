import { Component, OnInit } from '@angular/core';
import { MenuPage } from '../menu/menu.page';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import {
  LocationService,
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation
} from '@ionic-native/google-maps';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CrudService } from '../services/crud/crud.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-manage-detail',
  templateUrl: './manage-detail.page.html',
  styleUrls: ['./manage-detail.page.scss'],
})


export class ManageDetailPage implements OnInit {

  map: GoogleMap;
  dummyImg = '../../assets/images/dummy-image.jpg';
  parkingInfo = {
    xcord: 0,
    ycord: 0,
    parkplatz: '',
    strab: '',
    haus: '',
    plz: '',
    ort: '',
    image: '',
    remember_token: ''
  }
  private parkid;
  private token;
  private baseUrl= 'http://api.parkcollect.draft-box.de/';

  constructor(
    public alertController: AlertController, 
    public modalController: ModalController, 
    private photoLibrary: PhotoLibrary, 
    private camera: Camera, 
    public crud: CrudService, 
    private nativeStorage: NativeStorage, 
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    public navCtrl: NavController
  ) { }

  ionViewWillEnter(){
    this.parkid= this.route.snapshot.paramMap.get('id');
    if(this.parkid) {
      this.crud.viewParking(this.parkid).then((res: any) => {
        console.log('res: ' + res);
        this.parkingInfo = res;
        this.parkingInfo.remember_token = this.token;
        this.dummyImg = this.baseUrl + this.parkingInfo.image;
        delete this.parkingInfo.image;
        this.loadMap();
      })
    } else {
      this.loadMap();
    }
  }

  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg
    });
    return await loading.present();
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
      this.dummyImg = base64Image;
      this.parkingInfo.image = imageData;
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
      this.dummyImg = base64Image;
      this.parkingInfo.image = imageData;
    }, (err) => {
      this.presentAlert();
    });
  }

  ngOnInit() {
    this.nativeStorage.getItem('token').then((value) => {
      this.token = value;
      this.parkingInfo.remember_token = this.token;
    });
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
    LocationService.getMyLocation().then((myLocation: MyLocation) => {

      if(this.parkid) {
      } else {
        this.parkingInfo.xcord = myLocation.latLng.lat;
        this.parkingInfo.ycord = myLocation.latLng.lng;
      }

      let coords = {lat: this.parkingInfo.xcord, lng: this.parkingInfo.ycord};

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: coords,
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);

      let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: coords,
        draggable: true,
      });
      marker.on(GoogleMapsEvent.MARKER_DRAG_END).subscribe(() => {
        console.log(marker.getPosition().lat);
        this.parkingInfo.xcord = marker.getPosition().lat;
        this.parkingInfo.ycord = marker.getPosition().lng;
      });

  });
  }

  saveParking() {
    if(this.parkid) {
      this.updateParking();
    } else {
      this.insertParking();
    }
  }

  insertParking() {
    this.presentLoading('Saving...');
    this.crud.addParking(this.parkingInfo).then((res) => {
      console.log('Res ' + res);
      this.loadingCtrl.dismiss();
      this.parkingInfo.parkplatz = '';
      this.parkingInfo.strab = '';
      this.parkingInfo.parkplatz = '';
      this.parkingInfo.strab = '';
      this.parkingInfo.haus = '';
      this.parkingInfo.plz = '';
      this.parkingInfo.ort = '';
      this.parkingInfo.image = '../../assets/images/dummy-image.jpg';
      this.navCtrl.back();
    });
  }

  updateParking() {
    this.presentLoading('Saving...');
    this.crud.updateParking(this.parkingInfo, this.parkid).then((res) => {
      this.loadingCtrl.dismiss();
      this.navCtrl.back();
    });
  }

  deleteImage() {
    this.dummyImg = '../../assets/images/dummy-image.jpg';
  }

}
