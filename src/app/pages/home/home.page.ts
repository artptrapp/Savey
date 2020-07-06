import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private authService: AuthService
  ) { }

  public handleLogin(type: string) {
    if (type === "FACEBOOK") {
      this.facebookLogin()
    }
  }

  private facebookLogin() {
    console.log("will fb login")
    this.authService.facebookLogin()
  }
}