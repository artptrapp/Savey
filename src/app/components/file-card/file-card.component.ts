import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFile } from 'src/app/services/file/file.service';
import { PopoverController } from '@ionic/angular';
import { FilePopoverComponent } from 'src/app/components/file-popover/file-popover.component'

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {

  @Input() file: IFile
  @Output() onTriggerReload: EventEmitter<void> = new EventEmitter();
  
  public iconName: string = ""

  private iconMapping = {
    'png': 'image-icon.png',
    'jpg': 'image-icon.png',
    'jpeg': 'image-icon.png',
    'bmp': 'image-icon.png',
    'mp4': 'video-icon.png',
    'avi': 'video-icon.png',
    'pdf': 'pdf-icon.png'
  }

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    const icon = this.iconMapping[this.file.fileExtension] || 'file-icon.png'
    this.iconName = `assets/icon/${icon}`
  }

  async showActions(event) {
    const popover = await this.popoverController.create({
      component: FilePopoverComponent,
      event: event,
      translucent: true,
      showBackdrop: false,
      componentProps: {
        selectedFile: this.file
      }
    });
    await popover.present();
    const result = await popover.onDidDismiss()
    if (result && result.data && result.data.mustReload) {
      this.onTriggerReload.emit()
    }
  }

}
