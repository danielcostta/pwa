import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioDto } from '../../Model/usuarioDto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarioDto: UsuarioDto;

  constructor(public navCtrl: NavController) {

  }

}
