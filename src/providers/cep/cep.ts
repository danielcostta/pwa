import { Injectable } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MoradiaDto } from '../../Model/moradiaDto';

@Injectable()
export class CepProvider {

  constructor(private http: Http) {
    
  }

  buscar(cep:number){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
              .toPromise()
              .then(response => {
                console.log(response);
                return this.converterResposta(response.json())
              });
  }

  private converterResposta(cepResposta): MoradiaDto{
    let moradiaDto = new MoradiaDto();
    moradiaDto.CEP = cepResposta.cep;
    moradiaDto.Logradouro = cepResposta.logradouro;
    moradiaDto.Bairro = cepResposta.bairro;
    moradiaDto.Cidade = cepResposta.localidade;
    moradiaDto.Estado = cepResposta.uf;
    return moradiaDto;
  }

}
