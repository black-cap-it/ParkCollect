import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { HomePage } from '../../home/home.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  password: string = '';
  cpassword: string = '';
  email: string = '';
  errorMsg: string;

  constructor(public auth: AuthService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg
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

  register() {

    if (this.email.trim() !== '') {

      if (this.password.trim() !== '') {
        if (this.password.trim() !== this.cpassword.trim()) {
          this.presentWarning("Passwords doesn't match");
        } else {
          let credentials = {
            name: this.email,
            email: this.email,
            password: this.password
          };
  
          this.presentLoading('Registering...');
          this.auth.createAccount(credentials).then((res) => {
            this.loadingCtrl.dismiss();
            this.presentLoading('Logging in...');
            this.auth.login(credentials).then((res) => {
              this.loadingCtrl.dismiss();
              this.navCtrl.navigateForward('home');
            }, (err) => {
              console.log(err);
              alert('Auto Logging in Failed! Redirecting...');
              this.loadingCtrl.dismiss();
            });
          }, (err) => {
            console.log(err);
            alert('Registration Failed! Try again');
            this.loadingCtrl.dismiss();
          });
        }
      } else {
        this.presentWarning('Please enter your password')
      }
    }
    else {
      this.presentWarning('Please enter your E-mail');
    }

  }

}
