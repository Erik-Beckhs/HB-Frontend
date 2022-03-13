import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'division'
})
export class DivisionPipe implements PipeTransform {

  transform(value: string): string {
    let div!:string;
    switch(value){
      case '01':
        div = 'Industria & Construcción';
        break;
      case '02':
        div = 'Consumo & Pharma';
        break;
      case '03':
        div = 'Automotríz';
        break;
      case '04':
        div = 'Soluciones Médicas';
        break;
      case '06':
        div = 'Proyectos & Servicios';
        break;
      case '07':
        div = 'Windsor';
        break;
      case '98':
        div = 'Holding';
        break;
      case '99':
        div = 'Administracion & Finanzas';
        break;
      default:
        div = 'Desconocido';
    }
    return div;
  }

}
