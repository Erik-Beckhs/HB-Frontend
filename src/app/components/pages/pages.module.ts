import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/material/material.module";
import { PipesModule } from "src/app/pipes/pipes.modules";
import { SharedModule } from "../shared/shared.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutes } from "./pages.routes";
import { PaysComponent } from "./pays/pays.component";
import { ProfileComponent } from "./profile/profile.component";
import { RankingComponent } from "./ranking/ranking.component";
import { SettingsComponent } from "./settings/settings.component";
import { GeneralComponent } from './general/general.component';
import { HansaBusinessComponent } from './hansa-business/hansa-business.component';
import { NotRegisteredComponent } from './not-registered/not-registered.component';
import { SupplierComponent } from './supplier/supplier.component';

@NgModule({
    declarations:[
        PagesComponent,
        ProfileComponent, 
        PaysComponent, 
        SettingsComponent,
        RankingComponent,
        GeneralComponent,
        HansaBusinessComponent,
        NotRegisteredComponent,
        SupplierComponent
    ],
    imports:[
        SharedModule,
        MaterialModule,
        PagesRoutes,
        PipesModule
    ],
    exports:[
        PagesComponent,
        ProfileComponent, 
        PaysComponent,
        RankingComponent,
        HansaBusinessComponent,
        NotRegisteredComponent,
        SupplierComponent
    ]
})

export class PagesModule { }