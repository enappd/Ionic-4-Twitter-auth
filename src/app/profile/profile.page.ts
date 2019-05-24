import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private fireAuth: AngularFireAuth) {

  }
  ngOnInit() {
    this.nativeStorage.getItem('user_data')
      .then(
        data => {
          console.log(data);
          this.user = data;
        },
        error => console.error(error)
      );
  }

  logout() {

    // this.fireAuth.auth.signOut().then(() => {
    //   this.router.navigate(["/home"]);
    // })

    // Enable the following block if you want to use Native Storage instead of Firebase

    this.twitter.logout().then(response => {
      this.nativeStorage.remove('user_data');
      this.router.navigate(["/home"]);
    }, error => {
      console.log(error);
    });
  }
}
