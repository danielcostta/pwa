import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AutenticarProvider} from '../autenticar/autenticar';
import { MoradiaDto } from '../../Model/moradiaDto';

@Injectable()
export class PesquisaProvider {

  moradiaDto = new MoradiaDto();

  constructor(public afDB : AngularFireDatabase,
              public auth: AutenticarProvider) {

  }

  private getPath()
{
return 'moradia/'; 
}

getNomeMoradia(cidadeMoradia : string) {
  return this.afDB.list<MoradiaDto>(this.getPath(), ref => 
    ref.orderByChild('Cidade').equalTo(cidadeMoradia)
  ).valueChanges();
}

getMoradiaInicio(cidadeMoradia : string)
{
return this.afDB.list<MoradiaDto>(this.getPath(),
ref => 
ref.orderByChild('Cidade')
.startAt(cidadeMoradia)
.endAt(cidadeMoradia + "z")
).valueChanges();
}

get(key: string) {
return this.afDB.list<MoradiaDto>(
this.getPath() + key).valueChanges();
}  

getMoradias() {
  return this.afDB.list<MoradiaDto>(this.getPath(), ref => ref.orderByChild('Cidade')).valueChanges();     
}

getMoradia() {
  return this.afDB.object(this.getPath()).snapshotChanges();
}

}
