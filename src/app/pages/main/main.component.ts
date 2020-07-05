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

  private fetchingFiles: boolean = false
  private files: IFile[] = []
  private user: firebase.User

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

  fetchFiles(uid) {
    try {
      this.fileService.getAllUserFiles(uid).subscribe((files) => {
        this.files = files
        this.fetchingFiles = false
      })
    } catch (e) {
      console.log(e)
    }
  }

  openMenu() {
    this.menu.open('mainMenu')
  }

  addItem() {

  }

}
