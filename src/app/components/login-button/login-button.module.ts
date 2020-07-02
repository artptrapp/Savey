import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginButtonComponent } from 'src/app/components/login-button/login-button.component';

@NgModule({
  imports: [IonicModule],
  declarations: [LoginButtonComponent],
  exports: [LoginButtonComponent]
})
export class LoginButtonModule {}
