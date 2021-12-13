import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ExitQuotationGuard } from "src/app/guards/exit-quotation.guard";
import { AuctionComponent } from "./auction/auction.component";
import { ContentInfoComponent } from "./content-info/content-info.component";
import { ContentPrincipalComponent } from "./content-principal.component";
import { ContentSideComponent } from "./content-side/content-side.component";
import { CotizacionesComponent } from "./cotizaciones/cotizaciones.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { LobbyComponent } from "./lobby/lobby.component";
import { QuotationComponent } from "./quotation/quotation.component";
import { RespuestasComponent } from "./respuestas/respuestas.component";

const principal_routes:Routes=[
    {path:'cot-principal', canActivate:[AuthGuard], component:ContentPrincipalComponent,
    children:[
      {path:'', component:CotizacionesComponent},
      {path:'content-side/:id', component:ContentSideComponent, children:[
        {path:'', redirectTo:'content-info', pathMatch:'full'},
        {path:'auction', component:AuctionComponent},
        {path:'lobby', component:LobbyComponent},
        {path:'content-info', component:ContentInfoComponent,
        children:[
            {path:'', component:InformacionComponent},
            {path:'quotation', canDeactivate:[ExitQuotationGuard], component:QuotationComponent},
            {path:'respuestas', component:RespuestasComponent},
         ]
        },
      ]},
    ]
  },
]

export const PrincipalRoutes = RouterModule.forChild(principal_routes)