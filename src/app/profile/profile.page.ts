import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  user: any;
  constructor(
    private router: Router,
    private nativeStorage: NativeStorage,
    private twitter: TwitterConnect,
    private fireAuth: AngularFireAuth,
    public loadingController: LoadingController) {

  }

  ////TODO // ENABLE THIS BLOCK IF YOU WANT TO USE NATIVE STORAGE INSTEAD OF FIREBASE ---- START

  // ngOnInit() {
  //   this.nativeStorage.getItem('user_data')
  //     .then(
  //       data => {
  //         console.log(data);
  //         this.user = data;
  //       },
  //       error => console.error(error)
  //     );
  // }

  // logout() {
  //   this.twitter.logout().then(response => {
  //     this.nativeStorage.remove('user_data');
  //     this.router.navigate(["/home"]);
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  //  ---- END


  ////TODO // ENABLE THIS BLOCK IF YOU WANT TO USE FIREBASE INSTEAD OF NATIVE STORAGE ---- START

  async ngOnInit() {
    this.twitter.showUser()
      .then(user => {
        console.log(user);
      },
        // the plugin currently goes in error even if login is a success
        err => {
          console.log('Error retrieving user profile');
          console.log(err);
          // Modify profile image url to get bigger image
          var user_image = err.profile_image_url_https.replace('_normal', '');

          this.user = {
            name: err.name,
            handle: err.screen_name,
            followers: err.followers_count,
            profile_image: user_image,
            banner: err.profile_banner_url,
            location: err.location
          }
        })
  }

  logout() {
    this.fireAuth.auth.signOut().then(() => {
      this.router.navigate(["/home"]);
    })
  }

  //  ---- END


}
