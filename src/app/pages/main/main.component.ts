import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FileService, IFile } from 'src/app/services/file/file.service';
import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  public fetchingFiles: boolean = false
  public files: IFile[] = []
  public user: firebase.User

  public isUploadingFile = false
  public uploadPercentage: number = 0

  constructor(
    private menu: MenuController,
    private auth: AngularFireAuth,
    private fileService: FileService
  ) {
  }

  ngOnInit() {
    this.fetchingFiles = true
    this.waitForUser()
  }

  waitForUser() {
    this.auth.user.subscribe((user) => {
      if (!user) {
        return
      }
      this.user = user
      this.fetchFiles(user.uid)
    })
  }

  async fetchFiles(uid) {
    this.fetchingFiles = true
    this.files = await this.fileService.getAllUserFiles(uid)
    this.fetchingFiles = false
  }

  triggerReload() {
    this.fetchFiles(this.user.uid)
  }

  openMenu() {
    this.menu.open('mainMenu')
  }

  addItem() {
    this.fileService.getAndUpload(this.user.uid, this.onProgress.bind(this), this.onFinish.bind(this))
  }

  onProgress(percent) {
    this.isUploadingFile = true
    this.uploadPercentage = parseInt(percent) / 100
    console.log(this.uploadPercentage)
  }

  onFinish() {
    this.isUploadingFile = false
    this.fetchFiles(this.user.uid)
  }

  ngOnDestroy() {
  }

}
