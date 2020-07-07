import { Component, OnInit } from '@angular/core';
import { IFile, FileService } from 'src/app/services/file/file.service';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-file-popover',
  templateUrl: './file-popover.component.html',
  styleUrls: ['./file-popover.component.scss'],
})
export class FilePopoverComponent implements OnInit {

  selectedFile: IFile
  private user: firebase.User

  constructor(
    private popoverController: PopoverController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private fileService: FileService,
    private auth: AngularFireAuth,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      this.user = user
    })
  }

  async delete() {
    const modal = await this.alertController.create({
      message: `Are you sure you want to delete ${this.selectedFile.fileName}? This action cannot be undone.`,
      buttons: [
        {
          text: 'Yes',
          handler: () => { modal.dismiss(); this.deleteConfirmed() }
        },
        {
          text: 'Cancel',
          handler: () => { modal.dismiss() }
        }
      ]
    })
    await modal.present()
  }

  async deleteConfirmed() {
    const loader = await this.loadingController.create({
      message: 'Please wait...'
    })
    await loader.present()
    const result = await this.fileService.deleteFile(this.user.uid, this.selectedFile)
    await loader.dismiss()
    if (!result) {
      const alert = await this.alertController.create({
        message: 'Failed to delete. Try again later.'
      })
      await alert.present()
      await alert.onDidDismiss()
      return
    }
    const alert = await this.alertController.create({
      message: `File ${this.selectedFile.fileName} deleted successfully.`
    })
    await alert.present()
    await alert.onDidDismiss()
    this.popoverController.dismiss({ mustReload: true })
  }


  async download() {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const loader = await this.alertController.create({
      message: 'Please wait...',
      buttons: [{
        text: 'Cancel',
        handler: () => { fileTransfer.abort() }
      }]
    })
    await loader.present()
    const downloadPath = this.file.dataDirectory + this.selectedFile.fileName
    console.log(downloadPath)
    try {
      const result = await fileTransfer.download(this.selectedFile.downloadUrl, downloadPath)
      loader.message = "File download successfully!"
      loader.buttons = [{
        text: 'Open',
        handler: () => { loader.dismiss(), this.fileOpener.open(downloadPath, '') }
      },{
        text: 'Close',
        handler: () => { loader.dismiss(), this.popoverController.dismiss({ mustReload: false }) }
      }]
    } catch (e) {
      loader.message = "Something went wrong. Try again later."
      loader.buttons = [{
        text: 'Ok',
        handler: () => { loader.dismiss(), this.popoverController.dismiss({ mustReload: false }) }
      }]
    }
  }

}
