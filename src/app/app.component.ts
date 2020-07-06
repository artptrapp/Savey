import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
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

  public appLoading = true
  public shouldEnableMenu = false

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.afAuth.authState.subscribe((user) => {
      console.log("Auth state changed!", user)
      this.appLoading = false;
      if (!user) {
        this.shouldEnableMenu = false
        this.router.navigateByUrl('/')
        return
      }
      this.shouldEnableMenu = true
      this.router.navigateByUrl('/main')
    })

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  home() {
    this.menu.close()
    this.router.navigateByUrl('main')
  }

  about() {
    this.menu.close()
    this.router.navigateByUrl('about')
  }

  logout() {
    this.menu.close()
    this.shouldEnableMenu = false
    this.afAuth.auth.signOut()
  }
}
