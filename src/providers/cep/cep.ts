import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { MoradiaDto } from '../../Model/moradiaDto';

@Injectable()
export class CepProvider {

  constructor(private http: Http) {
    
  }

  buscar(cep:string){
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
              .toPromise()
              .then(response => {
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

    moradiaDto.IdMoradia = 0;
    moradiaDto.NomeMoradia = "";
    moradiaDto.DescricaoMoradia = "";
    moradiaDto.Contato = 0;
    moradiaDto.Pais = "Brasil";
    moradiaDto.ValorAluguel = 0;
    moradiaDto.Imagem = "";
    moradiaDto.Numero = 0;

    return moradiaDto;
  }

}
