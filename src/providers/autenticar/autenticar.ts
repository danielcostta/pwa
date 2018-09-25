import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
//import { FirebaseAuth } from '@firebase/auth-types';

@Injectable()
export class AutenticarProvider {

  constructor(private afAuth : AngularFireAuth ) {
     
  }

  registrarUsuario(email:string, senha: string)  : any
  {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,
      senha)
      .then((res)=>
      {
         Promise.resolve(res)
      })
      .catch(err=> 
        {
          Promise.reject(err)
        });
  }

  autenticarUsuario(email:string, senha: string) : any
  {  
      return this.afAuth.auth.signInWithEmailAndPassword(email,
        senha)
        .then( user =>
        {
           Promise.resolve(user)
           //FirebaseAuth.Persistence.LOCAL;
        })
        .catch(err=> 
          {
            Promise.reject(err);
          });
          
  }

  getUsuario(){
    return this.afAuth.auth.currentUser.uid;
  }

  get Session(){
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
        console.log("Saiu"); 
    })
    .catch(err => {
      console.log("Erro");
      console.log(err);   
    });
    ;
  }

}
