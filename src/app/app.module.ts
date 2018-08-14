import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AutenticarProvider } from '../providers/autenticar/autenticar';
import { FirebasemoradiaProvider } from '../providers/firebasemoradia/firebasemoradia';
import { FirebaseusuarioProvider } from '../providers/firebaseusuario/firebaseusuario';

export const firebaseConfig = {
  apiKey: "AIzaSyCg_sOPp4_wVpOFURldKtPhP-89j104iNw",
  authDomain: "pwaalugaqui.firebaseapp.com",
  databaseURL: "https://pwaalugaqui.firebaseio.com",
  projectId: "pwaalugaqui",
  storageBucket: "pwaalugaqui.appspot.com",
  messagingSenderId: "569252443849"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticarProvider,
    FirebasemoradiaProvider,
    FirebaseusuarioProvider
  ]
})
export class AppModule {}
