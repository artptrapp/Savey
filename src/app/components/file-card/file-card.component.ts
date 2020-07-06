import { Component, OnInit, Input } from '@angular/core';
import { IFile } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss'],
})
export class FileCardComponent implements OnInit {

  @Input() file: IFile
  
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

  constructor() { }

  ngOnInit() {
    const icon = this.iconMapping[this.file.fileExtension] || 'file-icon.png'
    this.iconName = `assets/icon/${icon}`
  }

  showActions() {

  }

}
