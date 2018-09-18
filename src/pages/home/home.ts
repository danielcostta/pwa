import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController, Platform } from 'ionic-angular';
import { MoradiaDto } from '../../Model/moradiaDto';
import { BuscarTodosProvider } from '../../providers/buscar-todos/buscar-todos';
import { Geolocation } from '@ionic-native/geolocation';
import { GeolocalizacaoProvider } from '../../providers/geolocalizacao/geolocalizacao';

declare var google : any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  mapa : any;
  latitude : any;
  longitude : any;
  enderecoPosicao : "";
  latitudeDestino : 0;
  longitudeDestino : 0;
  enderecoDestino : any = "";
  nomeMoradia : String = "";
  cepMoradia : String = "";
  moradias : Array<MoradiaDto>;
  mensagem : String = "Moradias: ";
  loading : any;

  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public geolocation : Geolocation,
              public platform : Platform,
              private geolocalizacaoProvider: GeolocalizacaoProvider,
              private buscartodos: BuscarTodosProvider) {

                platform.ready().then(()=> {
                  this.obterPosicao();
                });
  }

  ionViewWillLoad() {
    this.carregarMoradias();
  }

  carregarMoradias() {
    this.loadMoradias();
    this.buscartodos.getMoradias().subscribe(moradias => {
      this.moradias = new Array<MoradiaDto>();
      moradias.forEach(element => {
        let key = Object.keys(element)[0]
        this.moradias.push(element[key]);
      });
      this.loading.dismiss();
    });
  }

  loadMoradias() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
  
    this.loading.present();
  }

  obterPosicao():any{
    this.geolocation.getCurrentPosition()
      .then(res=> {
        this.latitude = res.coords.latitude;
        this.longitude = res.coords.longitude;
        this.buscarEnderecoPorCoordenadas();
        this.loadMap();
      })
      .catch(
        (error) => {
          console.log(error.message);
          this.latitude = -18.3768;
          this.longitude = -46.0325;
          this.loadMap();
        }
      )

  }

  loadMap(){
    let mapContainer = document.getElementById('map');

    this.mapa = new google.maps.Map(
            mapContainer,
           {center: new google.maps.LatLng(
                        this.latitude, 
                        this.longitude), 
                        zoom : 14});

    let marcador = new google.maps.Marker({
      icon: 'assets/imgs/iconeAqui.png',
      map: this.mapa,
      position: new google.maps.LatLng(
            this.latitude, 
            this.longitude)
    });
    if (this.latitudeDestino != 0)
     {
        let marcador2 = new google.maps.Marker({
          icon: 'assets/imgs/iconeAqui.png',
          map : this.mapa, 
          position : new google.maps.LatLng(this.latitudeDestino, 
              this.longitudeDestino)
        });
     }

 }
  
 buscarEnderecoPorCoordenadas() {
  this.geolocalizacaoProvider.buscarEndereco(this.latitude,
      this.longitude).then (retorno => 
        {
          console.log(retorno);
           this.enderecoPosicao = retorno;
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

  detalhar(id){
    this.navCtrl.push("MoradiadetalhePage", {id});
  }

  alerta(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
}