import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { GeneralComponent } from "./general/general.component";
import { HansaBusinessComponent } from "./hansa-business/hansa-business.component";
import { NotRegisteredComponent } from "./not-registered/not-registered.component";
import { PagesComponent } from "./pages.component";
import { PasswordComponent } from "./password/password.component";
import { PaysComponent } from "./pays/pays.component";
import { ProfileComponent } from "./profile/profile.component";
import { RankingComponent } from "./ranking/ranking.component";
//import { SupplierComponent } from "./principal/supplier/supplier.component";
import { SettingsComponent } from "./settings/settings.component";
import { SupplierComponent } from "./supplier/supplier.component";

const pages_routes:Routes=[
    {path:'pages', canActivate:[AuthGuard], component:PagesComponent,
    children:[
    //{path:'', component:ProfileComponent},
        {path:'', component:GeneralComponent},
        {path:'general', component:GeneralComponent, data:{title:'Información General'}},
        {path:'password', component:PasswordComponent, data:{title:'Password'}},
        {path:'profile', component:ProfileComponent, data:{title:'Profile'}},
        {path:'ranking', component:RankingComponent, data:{title:'Ranking'}},
        {path:'pays', component:PaysComponent, data:{title:'Pays'}},
        //{path:'supplier', component:SupplierComponent},
        {path:'settings', component:SettingsComponent, data:{title:'Settings'}},
        {path:'business', component:HansaBusinessComponent, data:{title:'Hansa Business'},
        children:[
            {path:'notRegistered', component:NotRegisteredComponent},
            {path:'supplier', component:SupplierComponent}
        ]
        },
        {path:'**', redirectTo:'', pathMatch:'full'}
    ]},
]


export const PagesRoutes = RouterModule.forChild(pages_routes)