import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeSupplier'
})
export class TypeSupplierPipe implements PipeTransform {

  transform(value: any): string {
    let newValue:number=+value
    let res:string=''
    switch(newValue){
      case 1:
        res='Individual'
        break
      case 2:
        res='Empresa'
        break
      default:
        res='No Asignado'
        break
    }
    return res
  }

}
