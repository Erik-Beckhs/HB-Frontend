import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestType'
})
export class RequestTypePipe implements PipeTransform {

  transform(value: any): string {
    let res:string='';
    switch(value){
      case 1:
        res='Solicitud de Propuesta';
        break;
      case 2:
        res='Solicitud de Costos';
        break;
      case 3:
        res='Solicitud de Información';
        break;
      case 4:
        res='Subasta';
        break;
      default:
        res='Desconocido'
        break;
    }
    return res;
  }
}
