import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { Facebook } from '@ionic-native/facebook/ngx'

export const firebaseConfig = {
  apiKey: "AIzaSyD70zwFB9G7AdUGaOGy5hebudoWnwXP_gc",
  authDomain: "savey-66217.firebaseapp.com",
  databaseURL: "https://savey-66217.firebaseio.com",
  projectId: "savey-66217",
  storageBucket: "savey-66217.appspot.com",
  messagingSenderId: "119756552522",
  appId: "1:119756552522:web:296db10da3176a381de9b3",
  measurementId: "G-68C8KSYNMM"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
