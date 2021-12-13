import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'payconditionSupplier'
})
export class PayconditionSupplierPipe implements PipeTransform {

  transform(value: any): string {
    let res:string
    switch(value){
      case 'ZP01':
        res = 'Pago adelantado sin DPP'
        break
      case 'ZP02':
        res = 'Pago al Contado'
        break
      case 'ZP03':
        res = 'Pago a 30 días'
        break
      case 'ZP04':
        res = 'Pago a 45 días'
        break
      case 'ZP05':
        res = 'Pago a 60 días'
        break
      case 'ZP06':
        res = 'Pago a 90 días'
        break
      case 'ZP07':
        res = 'Pago a 120 días'
        break
      case 'ZP08':
        res = 'Pago a 180 días'
        break
      case 'ZP09':
        res = 'Pago a 30, 60, 90 días'
        break
      case 'ZP10':
        res = 'Pago a 30, 60, 90, 120 días'
        break
      case 'ZP11':
        res = 'Pago a 30, 60, 90, 120, 180 días'
        break
      case 'ZP12':
        res = 'Carta de crédito a 30 días'
        break
      case 'ZP13':
        res = 'Carta de crédito a 60 días'
        break
      case 'ZP14':
        res = 'Carta de crédito a 90 días'
        break
      case 'ZP15':
        res = 'Carta de crédito a 180 días'
        break
      case 'ZP16':
        res = 'Letra de cambio a 30 días'
        break
      default:
        res="No encontrado"
        break;      
    }
    return res
  }

}
