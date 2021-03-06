import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      {title: 'Inicio', component: HomePage},
      {title: 'Entrar', component: 'EntrarPage'},
      {title: 'Cadastrar', component: 'CadastroPage'},
      {title: 'Contato', component: 'ContatoPage'}
    ];

  }

  openPage(page){
    if(page.title == "Fechar")
    {
      this.platform.exitApp();
    }
    else
    {
      this.nav.setRoot(page.component);
    }
  }

}



