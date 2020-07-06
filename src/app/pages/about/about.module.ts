import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AboutPage } from './about.page';
import { LoginButtonModule } from 'src/app/components/login-button/login-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AboutPage]
})
export class HomePageModule {}
