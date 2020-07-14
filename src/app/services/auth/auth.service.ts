import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fb: Facebook, private auth: AngularFireAuth) { }

  public async facebookLogin(): Promise<any> {
    try {
      const facebookLoginResponse = await this.fb.login(['email'])
      const credential = auth.FacebookAuthProvider.credential(facebookLoginResponse.authResponse.accessToken)
      const firebaseResult = await this.auth.auth.signInWithCredential(credential)
      return firebaseResult
    } catch (e) {
      console.log(e)
      return null
    }
  }

  public async anonymousLogin(): Promise<any> {
    try {
      const firebaseResult = await this.auth.auth.signInAnonymously()
      return firebaseResult
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
