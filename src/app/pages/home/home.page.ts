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
    } else if (type === "ANONYMOUS") {
      this.anonymousLogin()
    }
  }

  private facebookLogin() {
    this.authService.facebookLogin()
  }

  private anonymousLogin() {
    this.authService.anonymousLogin()
  }
}