import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  api = 'http://api.parkcollect.draft-box.de';
  public token: any;

  constructor(private http: HTTP, private nativeStorage: NativeStorage) { }

  /*  Add Single Parking */
  addParking(parkingInfo) {
    this.http.setDataSerializer('json');

    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('token').then((value) => {
        console.log(value);

        this.http.post(this.api + '/api/parking', parkingInfo, { "Content-Type": "application/json" })
        .then(data => {
          let res = JSON.parse(data.data);
          console.dir(res.data);
            resolve("Success!");
          }, (err) => {
            reject(err);
          }); 
      }) 
   
    });
  }

  /*  Update Single Parking */
  updateParking(parkingInfo, parkid) {
    this.http.setDataSerializer('json');

    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('token').then((value) => {
        console.log(value);

        this.http.post(this.api + '/api/parking/edit/' + parkid, parkingInfo, { "Content-Type": "application/json" })
        .then(data => {
          let res = JSON.parse(data.data);
          console.dir(res.data);
            resolve("Success!");
          }, (err) => {
            reject(err);
          }); 
      }) 
   
    });
  }

  /*  View All Parkings */
  viewParkings() {
    this.http.setDataSerializer('json');

    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('token').then((value) => {
        this.token = value;

        this.http.post(this.api + '/api/parking/view', { "remember_token": this.token }, { "Content-Type": "application/json" })
        .then(data => {
          let res = JSON.parse(data.data);
            resolve(res.data);
          }, (err) => {
            reject(err);
          }); 
      }) 
   
    });
  }

  /*  View Single Parking */
  viewParking(id) {
    this.http.setDataSerializer('json');

    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('token').then((value) => {
        this.token = value;

        this.http.post(this.api + '/api/parking/view/' + id, { "remember_token": this.token }, { "Content-Type": "application/json" })
        .then(data => {
          let res = JSON.parse(data.data);
            resolve(res.data);
          }, (err) => {
            reject(err);
          }); 
      }) 
   
    });
  }

  /* Delete Single Parking */
  deleteParking(id) {
    this.http.setDataSerializer('json');

    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('token').then((value) => {
        this.token = value;
        this.http.post(this.api + '/api/parking/delete/' + id, { "remember_token": this.token }, { "Content-Type": "application/json" })
        .then(data => {
          let res = JSON.parse(data.data);
            resolve(res.data);
          }, (err) => {
            reject(err);
          }); 
      }) 
   
    });
  }
}
