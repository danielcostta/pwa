import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AutenticarProvider} from '../../providers/autenticar/autenticar';

@IonicPage()
@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html',
})
export class EntrarPage {

  usuario = {email:"",
  senha:""};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth : AutenticarProvider,
              public loading :LoadingController,
              public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrarPage');
  }

  autenticar() {

    let loader = this.loading.create({
      content: "Por favor, Aguarde ..."
    });  
    loader.present();

     this.auth.autenticarUsuario(this.usuario.email, 
            this.usuario.senha)
     .then(user => {
        loader.dismiss();
        this.navCtrl.setRoot("MoradiasPage");   
     })
     .catch(err=> {
        loader.dismiss();
        console.log(err);
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err.message,
            buttons: ['OK']
        });
        alert.present;
     });
  }

}
