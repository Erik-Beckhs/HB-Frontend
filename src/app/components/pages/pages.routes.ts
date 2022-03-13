import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { Page404Component } from "../shared/page404/page404.component";
import { AnswerGralComponent } from "./answer-gral/answer-gral.component";
import { GeneralComponent } from "./general/general.component";
import { HansaBusinessComponent } from "./hansa-business/hansa-business.component";
import { NotRegisteredComponent } from "./not-registered/not-registered.component";
import { PagesComponent } from "./pages.component";
import { PasswordComponent } from "./password/password.component";
import { PaysComponent } from "./pays/pays.component";
import { ProfileComponent } from "./profile/profile.component";
import { QuotationGralComponent } from "./quotation-gral/quotation-gral.component";
import { QuotationsAdminComponent } from "./quotations-admin/quotations-admin.component";
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
        {path:'quotationsAdmin', component:QuotationsAdminComponent, data:{title:'Quotations'}, 
        children: [
            {path:'', redirectTo:'quotationGral', pathMatch:'full'},
            {path:'quotationGral', component:QuotationGralComponent},
            {path:'quotationGral/:id', component:AnswerGralComponent},
            {path:'**',  component:Page404Component}
        ]},
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