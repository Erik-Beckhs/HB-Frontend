import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: any): any {
    let resp:any
    if(value === true){
      resp='SI';
    }
    else{
      resp='NO';
    }
    return resp;
  }
}
