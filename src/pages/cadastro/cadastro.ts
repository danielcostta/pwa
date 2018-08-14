import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AutenticarProvider} from '../../providers/autenticar/autenticar';
import { EntrarPage } from '../entrar/entrar';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario = {email:"",
             senha:""
            };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth : AutenticarProvider,
              public loading :LoadingController,
              public alertCtrl : AlertController,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  criarUsuario(){

    let loader = this.loading.create({
      content: "Por favor, Aguarde ..."
    });  
    loader.present();

   this.auth.registrarUsuario(this.usuario.email, this.usuario.senha)
     .then((user) => {
      loader.dismiss();
      this.navCtrl.setRoot(EntrarPage);   
     })
     .catch(err=> {
      loader.dismiss();
        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: err.message,
            buttons: ['OK']
        });
        alert.present;
     });
}

}
