import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TwitterConnect, TwitterConnectResponse } from '@ionic-native/twitter-connect/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: any;
  constructor(
    private router: Router,
    public loadingController: LoadingController,
    private nativeStorage: NativeStorage,
    private twitter: TwitterConnect,
    private fireAuth: AngularFireAuth
  ) {

  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Connecting ...'
    });
  }


  async presentLoading(loading) {
    return await loading.present();
  }


  async login() {

    // show loader
    this.presentLoading(this.loading);
    // login with twitter
    this.twitter.login().then((res) => this.onLoginSuccess(res), (err) => this.onLoginError(err))
  }
  onLoginSuccess(res: TwitterConnectResponse) {
    console.log(res);

    ////TODO // ENABLE THIS BLOCK IF YOU WANT TO USE FIREBASE INSTEAD OF NATIVE STORAGE---- START

    const { token, secret } = res;
    const credential = firebase.auth.TwitterAuthProvider.credential(token, secret);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((response) => {
        console.log(response);
        this.router.navigate(["/profile"]);
        this.loading.dismiss();
      })

    // ---- END


    ////TODO // ENABLE THIS BLOCK IF YOU WANT TO USE NATIVE STORAGE INSTEAD OF FIREBASE ---- START

    // this.twitter.showUser()
    //   .then(user => {
    //     console.log('User Profile:');
    //     console.log(user);
    //     console.log('Twitter handle :' + user.screen_name);
    //     this.loading.dismiss();
    //   },
    //     // the plugin currently goes in error even if login is a success
    //     err => {
    //       console.log('Error retrieving user profile');
    //       console.log(err);
    // Modify profile image url to get bigger image 
    // var user_image = err.profile_image_url_https.replace('_normal', '');

    // this.nativeStorage.setItem('user_data', {
    //   name: err.name,
    //   handle: err.screen_name,
    //   followers: err.followers_count,
    //   profile_image: user_image,
    //   banner: err.profile_banner_url,
    //   location: err.location
    // })
    //   .then(() => {
    //     this.router.navigate(["/profile"]);
    //     this.loading.dismiss();
    //   }, (error) => {
    //     console.log(error);
    //     this.loading.dismiss();
    //   })
    // })

    //  ---- END

  }
  onLoginError(err) {
    console.log(err);
  }
}
