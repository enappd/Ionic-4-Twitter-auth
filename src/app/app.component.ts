import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private nativeStorage: NativeStorage,
    private fireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {


      ////TODO // ENABLE THIS BLOCK IF YOU WANT TO USE NATIVE STORAGE INSTEAD OF FIREBASE ---- START

      // this.nativeStorage.getItem('user_data')
      //   .then(data => {
      //     // user data is already saved
      //     this.router.navigate(["/profile"]);
      //     this.splashScreen.hide();
      //   },
      //     // no previous user, go to login page
      //     err => {
      //       this.router.navigate(["/home"]);
      //       this.splashScreen.hide();
      //     })

      //  ---- END

      ////TODO // ENABLE THIS BLOCK IF YOU WANT TO USE FIREBASE INSTEAD OF NATIVE STORAGE ---- START


      this.fireAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.router.navigate(["/profile"]);
          this.splashScreen.hide();
        }
        else {
          this.router.navigate(["/home"]);
          this.splashScreen.hide();
        }
      })

      //  ---- END


      this.statusBar.styleDefault();
    });
  }
}
