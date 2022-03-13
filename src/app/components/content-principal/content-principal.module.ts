import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { SharedModule } from "src/app/components/shared/shared.module";
import { MaterialModule } from "src/app/material/material.module";
import { PipesModule } from "src/app/pipes/pipes.modules";
import { ContentInfoComponent } from "./content-info/content-info.component";
import { ContentPrincipalComponent } from "./content-principal.component";
import { PrincipalRoutes } from "./content-principal.routes";
import { InformacionComponent } from "./informacion/informacion.component";
import { QuotationComponent } from './quotation/quotation.component';
import { AuctionComponent } from './auction/auction.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ContentSideComponent } from './content-side/content-side.component';
import { AuctionChartComponent } from "./auction/auction-chart/auction-chart.component";
import { NgChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from "ngx-spinner";
import { DialogsModule } from "../dialogs/dialogs.module";

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from "src/environments/environment";
import { MyquotationsComponent } from './myquotations/myquotations.component';

const config: SocketIoConfig = { 
    url: environment.wsUrl, options: {} 
};

@NgModule({
    declarations:[
        ContentPrincipalComponent,
        ContentInfoComponent,
        InformacionComponent,
        QuotationComponent,
        AuctionComponent,
        LobbyComponent,
        ContentSideComponent,
        AuctionChartComponent,
        MyquotationsComponent
    ],
    imports:[
        SharedModule,
        MaterialModule,
        PrincipalRoutes,
        PipesModule,
        NgChartsModule,
        NgxSpinnerModule,
        DialogsModule,

        SocketIoModule.forRoot(config)
    ],
    exports:[
        ContentPrincipalComponent,

        ContentInfoComponent,
        InformacionComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ContentPrincipalModule {}