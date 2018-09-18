import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MoradiaDto } from '../../Model/moradiaDto';
import { FirebasemoradiaProvider } from '../../providers/firebasemoradia/firebasemoradia';
import { BuscarTodosProvider } from '../../providers/buscar-todos/buscar-todos';

@IonicPage()
@Component({
  selector: 'page-moradiadetalhe',
  templateUrl: 'moradiadetalhe.html',
})
export class MoradiadetalhePage {

  nomeMoradia : String="";
  moradia : any = undefined;
  id: String;
  mensagem : String = "Moradias: ";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private fbmoradia: FirebasemoradiaProvider,
              private buscartodos: BuscarTodosProvider) {
                this.id = navParams.get('id');
               
  }

  ionViewDidLoad() {
    this.carregarMoradias();
  }

  carregarMoradias() {
    this.buscartodos.getMoradia().subscribe(snap => {
      let moradias = snap.payload.val()
      for (let i in moradias) {
        let key = Object.keys(moradias[i])[0]
        if (key == this.id) {
          this.moradia = moradias[i][key]
        }
      }
    });
  }

alerta(mensagem)
{ 

  let alert = this.alertCtrl.create({
    title: 'Atenção',
    subTitle: mensagem,
    buttons: ['OK']
  });
  alert.present();

}

}
