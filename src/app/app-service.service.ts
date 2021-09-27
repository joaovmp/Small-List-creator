import { Injectable } from '@angular/core';


//importa o mapeamento do RXJS (plugin de mapeamento)

import { map } from 'rxjs/operators';

// importa  COMPAT = NOVO dir

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth/';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';



export interface Produto {
  nome: string ;
  //email: string ;
}


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {



  // Declarar produto como um item de firestore //

  private produtoCollection: AngularFirestoreCollection <Produto>
  prd:Observable<Produto[]>

  // inicia o fireSTORE
  // depois procura "produto" no firebase

  constructor(public afs:AngularFirestore) { 

    this.produtoCollection= afs.collection<Produto>('produtos')


  }
//tira o "print" da requisição e volta a respota   (mantém conexao fechada)            
//
//ex: "value changes" (mantém conexao aberta)

  get(){

    return this.prd = this.produtoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Produto;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))

  );

  }

// nome do produto chega no data e adiciona (dentro do tag "nome") //

  create(data:string){
    this.produtoCollection.add({
      nome:data
        
    })
  }

  delete(id:string){
    this.produtoCollection.doc(id).delete();
}




}

