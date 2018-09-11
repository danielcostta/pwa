import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { MoradiaDto } from '../../Model/moradiaDto';
import { FirebasemoradiaProvider } from '../../providers/firebasemoradia/firebasemoradia';

@IonicPage()
@Component({
  selector: 'page-moradiadetalhe',
  templateUrl: 'moradiadetalhe.html',
})
export class MoradiadetalhePage {

  nomeMoradia : String="";
  moradias : Array<MoradiaDto>;
  mensagem : String = "Moradias: ";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private fbmoradia: FirebasemoradiaProvider) {

                this.montarTela();
  }

  montarTela()
  {      
    this.carregarMoradias();
  }

  carregarMoradias(){     
  
    if (this.nomeMoradia == "")
    {
      this.fbmoradia.getMoradias().subscribe(moradias => 
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
      this.fbmoradia.getMoradiaInicio(this.nomeMoradia.toString())
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

  incluir(){
    let moradiaDto : MoradiaDto; 
    moradiaDto = new MoradiaDto();    
    moradiaDto.IdMoradia = 0;
    this.abrirTelaMoradia(moradiaDto, "I");
}

editar(moradiaDto : MoradiaDto){
    this.abrirTelaMoradia(moradiaDto, "A");
}

excluir (moradiaDto : MoradiaDto)
{
  let confirm = this.alertCtrl.create({
    title: 'Atenção',
    message: 'Deseja realmente excluir o imóvel (' + moradiaDto.NomeMoradia + ') ?',
    buttons: [
      {
        text: 'Não',
        handler: () => {
          return;
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.excluirMoradia(moradiaDto);
        }
      }
    ]
  });
  confirm.present();
}

excluirMoradia(moradiaDto : MoradiaDto){
  this.fbmoradia.removerMoradia(moradiaDto.IdMoradia);
}

abrirTelaMoradia(moradiaDto : MoradiaDto, acao: String)
{
     
    let modal = this.modalCtrl.create('CadastromoradiaPage', 
      {moradiaDto : moradiaDto,
        acao : acao});

    modal.onDidDismiss(data => {   

        let moradia = new MoradiaDto();
        moradia = data.moradia;           
        if (data.origem == "S")
        {
          this.salvar(moradia);             
        }         

    });
    modal.present();
}

salvar(moradia : MoradiaDto){

  this.fbmoradia.armazenarMoradia(moradia)
    .then( ok => {       
       } );
  
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
