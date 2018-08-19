import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { MoradiaDto } from '../../Model/moradiaDto';
import { DomSanitizer } from '@angular/platform-browser';
import { CepProvider } from '../../providers/cep/cep';

@IonicPage()
@Component({
  selector: 'page-cadastromoradia',
  templateUrl: 'cadastromoradia.html',
})
export class CadastromoradiaPage {

  moradiaDto : MoradiaDto;
  mensagem : String = "";
  origem : String = "";
  file: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private sanitizer: DomSanitizer,
              private cepProvider: CepProvider) {

                this.montarTela(); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastromoradiaPage');
  }

  montarTela() {
      this.moradiaDto = new MoradiaDto();        
      this.moradiaDto = this.navParams.get("moradiaDto");
      let acao : String;
      acao = this.navParams.get("acao");

      if (acao.toUpperCase() == "I")
      {
        this.moradiaDto.IdMoradia = 0;
        this.moradiaDto.NomeMoradia = "";
        this.moradiaDto.DescricaoMoradia = "";
        this.moradiaDto.Logradouro = "";
        this.moradiaDto.Numero = 0;
        this.moradiaDto.Bairro = "";
        this.moradiaDto.CEP = 0;
        this.moradiaDto.Cidade = "";
        this.moradiaDto.Estado = "";
        this.moradiaDto.Pais = "";
        this.moradiaDto.ValorAluguel = 0;
        this.moradiaDto.Disponibilidade = true;
        this.moradiaDto.Imagem = "";
    }

  }

  fechar(){
    this.viewCtrl.dismiss({"moradia" : this.moradiaDto, "origem" : this.origem});
  }

  salvar()
  {
    
    if (this.moradiaDto.NomeMoradia == ""){
       alert("O nome do imóvel não foi informado");
       return;
    }

    if (this.moradiaDto.DescricaoMoradia == ""){
      alert("A descrição do imóvel não foi informada");
      return;
    }

    if (this.moradiaDto.Logradouro == ""){
      alert("O logradouro do imóvel não foi informado");
      return;
    }

    if (this.moradiaDto.Numero.toString() == ""){
      alert("O número do imóvel não foi informado");
      return;
    }

    if (this.moradiaDto.Bairro == ""){
      alert("O bairro do imóvel não foi informado");
      return;
    }

    if (this.moradiaDto.CEP.toString() == ""){
      alert("O CEP do imóvel não foi informado");
      return;
    }

    if (this.moradiaDto.Cidade == ""){
      alert("A cidade do imóvel não foi informada");
      return;
    }

    if (this.moradiaDto.Estado == ""){
      alert("O estado do imóvel não foi informado");
      return;
    }

    if (this.moradiaDto.Pais == ""){
      alert("O país do imóvel não foi informado");
      return;
    }

    if (this.moradiaDto.ValorAluguel.toString() == "" || this.moradiaDto.ValorAluguel == 0){
        alert("O valor do aluguel não foi informado ou é inválido");
        return;
    }
    
    this.origem = "S";
    this.fechar();     
     
  }

  changeListener(foto){
    this.readThis(foto.target);
  }

  readThis(inputValue: any) {

    var file:any = inputValue.files[0];

    var myReader:FileReader = new FileReader();

    myReader.readAsDataURL(file);

    myReader.onloadend = (e) => {

      this.sanitizer.bypassSecurityTrustUrl(myReader.result);

      this.moradiaDto.Imagem =  myReader.result;

    }
    
  }

  pesquisaCEP(){
    this.cepProvider.buscar(this.moradiaDto.CEP)
          .then((moradiaDto:MoradiaDto) => this.moradiaDto = moradiaDto)
          .catch(() =>{
            alert('Erro!');
          })
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
