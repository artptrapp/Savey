import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private appLoading = true

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.initializeApp();
  }
  initializeApp() {
    setTimeout(() => {
      this.afAuth.authState.subscribe((user) => {
        this.appLoading = false;
        if (!user) {
          this.router.navigateByUrl('/')
          return
        }

        this.router.navigateByUrl('/main')
      })
    }, 2000)

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
