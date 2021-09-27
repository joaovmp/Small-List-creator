import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppServiceService } from '../app-service.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page {

  


  //declarando variaveis//

  item: string;
  quantidade: number;
  lista: Array<any> = [];
  produtodb;
  alert: string;
  
  //iniciar plugins//

  constructor(public navCtrl:NavController,public service:AppServiceService) {

      this.puxar()

  }  

//a funcao "puxar" vai ler a função GET que está presente no service, 
// o subscribe vai manter o contato com o serviço,
//o resultado dessa requisição será extraído para a tag "resposta"

puxar(){

  this.service.get().subscribe((resposta)=>{
    this.produtodb=resposta;
    console.log(this.produtodb)

  })


}



criar(){
  this.service.create(this.item)
//condição pra não computar nada se o campo do input estiver vazio//
    if(this.item != undefined){
    }
            
}


  //iniciar o push dos inputs//

  list(){

    this.lista.push({
      
      nomeItem: this.item,
      quantidade: 1

    })

    this.item = undefined;
    console.log(this.item)
    console.log(this.lista)
    

  }
apagar(id){
    this.service.delete(id)

 }


clearField() {
  this.item = '';
}


}

function If(arg0: boolean) {
  throw new Error('Function not implemented.');
}
