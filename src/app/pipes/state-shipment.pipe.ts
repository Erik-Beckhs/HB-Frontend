import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateShipment'
})
export class StateShipmentPipe implements PipeTransform {

  transform(value: number): string {
    let ret:string;

    if(value == 1){
      ret = 'En transito';
    }
    else if(value == 2){
      ret = 'Anulado';
    }
    else{
      ret = 'Cerrado';
    }
    return ret;
  }

}
