import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateQuotationGral'
})
export class StateQuotationGralPipe implements PipeTransform {

  transform(value: any): string {
    let res:string='';
    if(value == 1){
      res = 'En espera';
    }
    else if(value == 2){
      res = 'En curso';
    }
    else if(value == 3){
      res = 'Concluida';
    }
    else{
      res = 'Desconocido';
    }
    return res;
  }

}
