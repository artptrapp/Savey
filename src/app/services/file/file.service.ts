import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx'
import { FilePath } from '@ionic-native/file-path/ngx';
import { finalize } from 'rxjs/operators';

export interface IFile {
    fileExtension: string,
    fileName: string,
    creationDate: Date,
    downloadUrl: string,
    key: string
}

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(
        private db: AngularFireDatabase,
        private file: File,
        private fileChooser: FileChooser,
        private filePath: FilePath,
        private storage: AngularFireStorage
    ) { }

    public async getAllUserFiles(userId: string): Promise<IFile[]> {
        try {
            const snapshot = await this.db.database.ref(`${userId}/files`).once('value')
            const result = snapshot.toJSON()
            const returnValue = []
            for (let key in result) {
                const file = result[key] as IFile
                file.key = key
                returnValue.push(file)
            }
            return returnValue
        } catch (e) {
            return null
        }
    }

    public async deleteFile(userId: string, file: IFile): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.storage.ref(`${userId}/${file.key}.${file.fileExtension}`).delete()
                result.subscribe(async () => {
                    await this.db.database.ref(`${userId}/files/${file.key}`).remove()
                    resolve(true)
                })
            } catch (e) {
                console.log(e)
                resolve(false)
            }
        })
    }

    public async getAndUpload(ownerId: string, onPercentChange: (percent) => void, onFinish: () => void) {
        try {
            const filePath = await this.fileChooser.open()
            const nativeFilePath = await this.filePath.resolveNativePath(filePath)
            const fileExtension = this.stripExtension(nativeFilePath)
            const safeFileName = this.stripFilename(nativeFilePath)
            const safeFilePath = this.stripPath(nativeFilePath)
            const fileData = await this.file.readAsArrayBuffer(safeFilePath, safeFileName)
            const desiredFileName = await this.createFileNode(ownerId)
            const fileRef = this.createUploadRef(ownerId, desiredFileName, fileExtension)
            const uploadTask = fileRef.put(fileData)
            const percentageSubscription = uploadTask.percentageChanges().subscribe(async percent => {
                onPercentChange(percent)
            })

            const refSubscription = uploadTask
                .snapshotChanges()
                .pipe(
                    finalize(() => {
                        fileRef.getDownloadURL().subscribe(async downloadUrl => {
                            await this.saveFileMetadata(ownerId, downloadUrl, desiredFileName, safeFileName, fileExtension)
                            onFinish()
                            percentageSubscription.unsubscribe()
                            refSubscription.unsubscribe()
                        });
                    })
                )
                .subscribe();
        } catch (e) {
            console.log(e)
            return null
        }
    }

    private saveFileMetadata(ownerId, downloadUrl, fileKey, fileName, fileExtension) {
        return this.db.database.ref(`${ownerId}/files/${fileKey}`).update({
            fileName,
            fileExtension,
            creationDate: new Date(),
            downloadUrl
        })
    }

    private createUploadRef(fileOwnerId, fileName, fileExtension) {
        const filePath = `${fileOwnerId}/${fileName}.${fileExtension}`
        return this.storage.ref(filePath)
    }

    public async createFileNode(uid: string) {
        const generatedNode = this.db.database.ref(`${uid}`).push({})
        return generatedNode.key
    }

    private stripExtension(name: string) {
        const lastDot = name.lastIndexOf(".")
        return name.substring(lastDot + 1)
    }

    private stripPath(fullPath: string) {
        const lastSlash = fullPath.lastIndexOf("/")
        return fullPath.substring(0, lastSlash)
    }

    private stripFilename(fullPath: string) {
        const lastSlash = fullPath.lastIndexOf("/")
        return fullPath.substring(lastSlash + 1)
    }
}