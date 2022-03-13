import { NgModule } from '@angular/core';
import { BooleanPipe } from './boolean.pipe';
import { DivisionPipe } from './division.pipe';
import { FillEmptyPipe } from './fill-empty.pipe';
import { ImgDocPipe } from './img-doc.pipe';
import { MoneySupplierPipe } from './money-supplier.pipe';
import { PayconditionSupplierPipe } from './paycondition-supplier.pipe';
import { PositionContactPipe } from './position-contact.pipe';
import { RequestTypePipe } from './request-type.pipe';
import { StateQuotationGralPipe } from './state-quotation-gral.pipe';
import { StateQuotationPipe } from './state-quotation.pipe';
import { StateShipmentPipe } from './state-shipment.pipe';
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
    StateQuotationGralPipe,
    BooleanPipe,
    DivisionPipe,
    StateShipmentPipe

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
    StateQuotationGralPipe,
    BooleanPipe,
    DivisionPipe,
    StateShipmentPipe
  ]
})
export class PipesModule { }
