import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positionContact'
})
export class PositionContactPipe implements PipeTransform {

  transform(value: any): string {
    let newValue:number=+value
    let res:string=''
    switch(newValue){
      case 1:
        res='Gerente de Logística'
        break
      case 2:
        res='Ejecutivo de Logística'
        break
      case 99:
        res='Otro'
        break
    }
    return res;
  }

}
