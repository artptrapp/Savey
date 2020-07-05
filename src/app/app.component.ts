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
    setTimeout(() => {
      this.afAuth.authState.subscribe((user) => {
        this.appLoading = false;
        if (!user) {
          this.shouldEnableMenu = false
          this.menu.enable(false, 'mainMenu')
          this.menu.close()
          this.router.navigateByUrl('/')
          return
        }
        this.shouldEnableMenu = true
        this.router.navigateByUrl('/main')
      })
    }, 500)

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.shouldEnableMenu = false
    this.menu.close()
    this.afAuth.auth.signOut()
  }
}
