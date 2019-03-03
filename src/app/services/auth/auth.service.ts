import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'http://api.parkcollect.draft-box.de';
  public token: any;

  constructor(private http: HTTP, private nativeStorage: NativeStorage) { }

  createAccount(details){
    this.http.setDataSerializer('json');
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.api + '/api/register', { "name": details.name, "email": details.email, "password": details.password }, { "Content-Type": "application/json" })
          .then(data => {
            let res = JSON.parse(data.data);
           // this.token = data.token;
            //this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
    });
  }

  login(credentials) {
    this.http.setDataSerializer('json');

    return new Promise((resolve, reject) => {
      this.http.post(this.api + '/api/login', { "email": credentials.email, "password": credentials.password }, { "Content-Type": "application/json" })
        .then(data => {
          let res = JSON.parse(data.data);
          this.nativeStorage.setItem('token', res.data.remember_token)
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );

          resolve(res);
        }, (err) => {
          reject(err);

        });
    });

  }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      this.nativeStorage.getItem('token').then((value) => {
      this.token = value;
      resolve(this.token)

    }) 
  });
  }

  logout(){
    this.nativeStorage.setItem('token', '');
   }
}
