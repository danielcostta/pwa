import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AutenticarProvider} from '../autenticar/autenticar';
import { MoradiaDto } from '../../Model/moradiaDto';

@Injectable()
export class BuscarTodosProvider {

  constructor(public afDB : AngularFireDatabase,
              public auth: AutenticarProvider) {

}

private getPath()
{
return 'moradia/'; 
}

getNomeMoradia(nomeMoradia : string) {
  return this.afDB.list<MoradiaDto>(this.getPath(), ref => 
    ref.orderByChild('NomeMoradia').equalTo(nomeMoradia)
  ).valueChanges();
}

getMoradiaInicio(nomeMoradia : string)
{
return this.afDB.list<MoradiaDto>(this.getPath(),
ref => 
ref.orderByChild('NomeMoradia')
.startAt(nomeMoradia)
.endAt(nomeMoradia + "z")
).valueChanges();
}

get(key: string) {
return this.afDB.list<MoradiaDto>(
this.getPath() + "/" + key).valueChanges();
}  

getMoradias() {
  return this.afDB.list<MoradiaDto>(this.getPath(), ref => ref.orderByChild('NomeMoradia')).valueChanges();     
}

}
