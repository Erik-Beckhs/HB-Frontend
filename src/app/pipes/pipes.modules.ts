import { NgModule } from '@angular/core';
import { BooleanPipe } from './boolean.pipe';
import { FillEmptyPipe } from './fill-empty.pipe';
import { ImgDocPipe } from './img-doc.pipe';
import { MoneySupplierPipe } from './money-supplier.pipe';
import { PayconditionSupplierPipe } from './paycondition-supplier.pipe';
import { PositionContactPipe } from './position-contact.pipe';
import { RequestTypePipe } from './request-type.pipe';
import { StateQuotationPipe } from './state-quotation.pipe';
import { TypeSupplierPipe } from './type-supplier.pipe';

@NgModule({
  declarations: [
    FillEmptyPipe,
    MoneySupplierPipe,
    PayconditionSupplierPipe,
    ImgDocPipe,
    TypeSupplierPipe,
    RequestTypePipe,
    PositionContactPipe,
    StateQuotationPipe,
    BooleanPipe

  ],
  imports: [
    
  ],
  exports:[
    FillEmptyPipe,
    MoneySupplierPipe,
    PayconditionSupplierPipe,
    ImgDocPipe,
    TypeSupplierPipe,
    RequestTypePipe,
    PositionContactPipe,
    StateQuotationPipe,
    BooleanPipe

  ]
})
export class PipesModule { }
