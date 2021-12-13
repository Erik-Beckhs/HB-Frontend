import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneySupplier'
})
export class MoneySupplierPipe implements PipeTransform {

  transform(value: any): string {
    let res:string=''
    switch(value){
      case "USD":
        res = "Dólares (USD)"
        break;
      case "EUR":
        res = "Euros (EUR)"
        break;
      case "BOB":
        res = "Bolivianos (BOB)"
        break;
      default:
        res = value
        break;
    }
    return res
  }

}
