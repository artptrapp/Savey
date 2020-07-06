import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FileCardComponent } from './file-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [FileCardComponent],
  exports: [FileCardComponent]
})
export class FileCardModule {}
