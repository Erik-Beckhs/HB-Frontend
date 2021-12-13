import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillEmpty'
})
export class FillEmptyPipe implements PipeTransform {

  transform(value: any, newValue:string="No Asignado"): any {
    if(value==null || value==''){
      return newValue
    }
    else{
      return value
    }
  }

}
