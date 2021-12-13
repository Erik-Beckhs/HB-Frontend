import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateQuotation'
})
export class StateQuotationPipe implements PipeTransform {

  transform(value: any): string {
    let res:string=''
    switch(value){
      case 1:
        res='Invitado';
        break;
      case 2:
        res='Respondido';
        break;
      case 3:
        res='Ganada la cotización';
        break;
      case 4:
        res='Rechazado';
        break;
      case 5:
        res='Concluyó la cotización';
        break;
      case 6:
        res='Aceptado';
        break;
      case 7:
        res='Aceptado sin Responder';
        break;
      case 8:
        res='Cotización cancelada';
        break;
      default:
        res='Desconocido';
        break;
    }
    return res
  }
}
