import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AutenticarProvider} from '../autenticar/autenticar';
import { UsuarioDto } from '../../Model/usuarioDto';

@Injectable()
export class FirebaseusuarioProvider {

  constructor(public afDB : AngularFireDatabase,
              public auth: AutenticarProvider) {

  }

  private getPath()
  {
    return 'usuario/' + this.auth.getUsuario(); 
  }
  
  armazenarUsuario(usuarioDto)
  {

    if (usuarioDto.IdUsuario == 0)
    {
      usuarioDto.IdUsuario = Date.now();
    }
    
    return this.afDB.database.ref(
      this.getPath() +  '/' + 
      usuarioDto.IdUsuario).set(usuarioDto);        
     
  }

  get(key: string) {
    return this.afDB.list<UsuarioDto>(
      this.getPath() + "/" + key).valueChanges();
  }  

  removerUsuario(id)
  {
    this.afDB.database.ref(
      this.getPath() +  '/' + id).remove();
  }

}
