import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

import { Environment } from '@ionic-native/google-maps/ngx';

import { AuthService } from '../app/services/auth/auth.service';

declare var TestFairy: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private keyboard: Keyboard,
    public authService: AuthService,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      Environment.setEnv({
        // api key for server
        'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAEpJMQmijgPW3t1TFDAtvIXxllhMJEiw0',

        // api key for local development
        'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAEpJMQmijgPW3t1TFDAtvIXxllhMJEiw0'
      });
      TestFairy.begin("SDK-oaSk2qPx");
      this.keyboard.setResizeMode('ionic');
      this.statusBar.styleDefault();
      this.checkAuth();
      this.splashScreen.hide();
    });
  }

  checkAuth() {
    this.authService.checkAuthentication().then((res)=>{
      //alert("res : " + res)

      if (res === '') {
        
      } else {
        this.router.navigateByUrl('/home');
      }
      
    })
  }
}
