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
  
    if (this.nomeMoradia == "")
    {
      this.buscartodos.getMoradias().subscribe(moradias => 
        {   
            this.moradias = new Array<MoradiaDto>();   
            let i = 0;
            moradias.forEach(element => {             
                this.moradias.length = 
                  this.moradias.length + 1; 
                this.moradias[i] = element;
                i = i + 1;
            });
        });
    }
    else {
      this.buscartodos.getMoradiaInicio(this.nomeMoradia.toString())
        .subscribe(moradias => 
        {   
            this.moradias = new Array<MoradiaDto>();   
            let i = 0;
            moradias.forEach(element => {             
                this.moradias.length = 
                  this.moradias.length + 1; 
                this.moradias[i] = element;
                i = i + 1;
            });
        });
    }     
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
