import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AutenticarProvider} from '../autenticar/autenticar';
import { EnderecoDto } from '../../Model/enderecoDto';

@Injectable()
export class FirebaseenderecoProvider {

  constructor(public afDB : AngularFireDatabase,
    public auth: AutenticarProvider) {

}

private getPath()
{
return 'endereco/' + this.auth.getUsuario(); 
}

armazenarEndereco(enderecoDto)
{

if (enderecoDto.IdEndereco == 0)
{
enderecoDto.IdEndereco = Date.now();
}

return this.afDB.database.ref(
this.getPath() +  '/' + 
enderecoDto.IdEndereco).set(enderecoDto);        

}

getEndereco(logradouro : string)
{
return this.afDB.list<EnderecoDto>(this.getPath(),
ref => 
ref.orderByChild('Logradouro')
.equalTo(logradouro)
).valueChanges();
}

getEnderecoInicio(logradouro : string)
{
return this.afDB.list<EnderecoDto>(this.getPath(),
ref => 
ref.orderByChild('Logradouro')
.startAt(logradouro)
.endAt(logradouro + "z")
).valueChanges();
}

get(key: string) {
return this.afDB.list<EnderecoDto>(
this.getPath() + "/" + key).valueChanges();
}  

getEnderecos() {
return this.afDB.list<EnderecoDto>(this.getPath(),
ref => ref.orderByChild('Logradouro'))
.valueChanges();     
}

removerEndereco(id)
{
this.afDB.database.ref(
this.getPath() +  '/' + id).remove();
}

}
