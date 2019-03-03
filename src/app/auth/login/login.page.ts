import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { HomePage } from '../../home/home.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  errorMsg: string;

  constructor(public auth: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in...'
    });
    return await loading.present();
  }

  async presentWarning(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {

    if (this.email.trim() !== '') {

      if (this.password.trim() === '') {
        this.presentWarning('Please enter your password')

      } else {

        let credentials = {
          email: this.email,
          password: this.password
        };

        this.presentLoading();
        this.auth.login(credentials).then((res) => {
          console.log(res);
          this.loadingCtrl.dismiss();
          this.navCtrl.navigateForward('home');
        }, (err) => {
          console.log(err);
          alert('Wrong credentials! Try again');
          this.loadingCtrl.dismiss();
        });
      }

    }
    else {
      this.presentWarning('Please enter your E-mail');
    }

  }

}
