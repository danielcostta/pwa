import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MoradiaDto } from '../../Model/moradiaDto';
import { BuscarTodosProvider } from '../../providers/buscar-todos/buscar-todos';
import { MoradiadetalhePage } from '../moradiadetalhe/moradiadetalhe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nomeMoradia : String = "";
  cepMoradia : String = "";
  moradias : Array<MoradiaDto>;
  mensagem : String = "Moradias: ";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private buscartodos: BuscarTodosProvider) {

                this.montarTela();
  }

  montarTela()
  {      
    this.carregarMoradias();
  }

  carregarMoradias(){     
      this.buscartodos.getMoradias().subscribe(moradias => 
        {   
            this.moradias = new Array<MoradiaDto>();   
            moradias.forEach(element => {
              let key = Object.keys(element)[0];    
                this.moradias[key] = element;
                console.log(this.moradias[key]);
            });
        });
   
  }
 
pesquisar() {
  let prompt = this.alertCtrl.create({
    title: 'Atenção',
    message: "Informe o CEP do imóvel",
    inputs: [
      {
        name: 'Imóvel',
        placeholder: 'CEP do Imóvel'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        handler: data => {
          this.cepMoradia = "";
          this.carregarMoradias();
        }
      },
      {
        text: 'Pesquisar',
        handler: data => {
          this.cepMoradia = data.Moradia;
          this.carregarMoradias();
        }
      }
    ]
  });
  prompt.present();
}

detalhar(){
  this.navCtrl.push("MoradiadetalhePage");
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
