import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface IFile {
    type: string,
    id: string,
    fileUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
      private db: AngularFireDatabase
  ) { }

  public getAllUserFiles(userId: string): Observable<IFile[]> {
    return this.db.list<IFile>(`${userId}/files`)
        .valueChanges()
  }
}