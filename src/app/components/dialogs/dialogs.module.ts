import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material/material.module";
import { PipesModule } from "src/app/pipes/pipes.modules";
import { SharedModule } from "../shared/shared.module";
import { TermsConditionsHansaComponent } from "./terms-conditions-hansa/terms-conditions-hansa.component";
import { ProductComponent } from './product/product.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AnswerSendComponent } from "./answer-send/answer-send.component";
import { AuctionRulesComponent } from './auction-rules/auction-rules.component';
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { TracingComponent } from './tracing/tracing.component';
import { RejectedSuppliersComponent } from './rejected-suppliers/rejected-suppliers.component';

@NgModule({
    declarations:[
       TermsConditionsHansaComponent,
       ProductComponent,
       ChangePasswordComponent,
       AnswerSendComponent,
       AuctionRulesComponent,
       PaymentDetailComponent,
       TracingComponent,
       RejectedSuppliersComponent
    ],
    imports:[
        SharedModule,
        MaterialModule,
        //PagesRoutes,
        PipesModule
    ],
    exports:[
        TermsConditionsHansaComponent,
        AnswerSendComponent,
        AuctionRulesComponent
    ]
})

export class DialogsModule { }