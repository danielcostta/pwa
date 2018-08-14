import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contato',
  templateUrl: 'contato.html',
})
export class ContatoPage {

  assunto: string = "";
  email: string = "";
  mensagem: string = "";
  origin: string = "danieljunnio@hotmail.com"
  win = eval('window');

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContatoPage');
  }

  enviarEmail(){

    

  }

}
