import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss'],
})
export class AboutPage {
  constructor(
    private authService: AuthService,
    private menu: MenuController
  ) { }

  openMenu() {
    this.menu.open('mainMenu')
  }

  openLink(link) {
    window.open(link)
  }

}
