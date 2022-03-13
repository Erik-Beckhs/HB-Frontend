//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesModule } from './components/pages/pages.module';
import { ContentPrincipalModule } from './components/content-principal/content-principal.module';

//Guards
//import { AuthGuard } from './guards/auth.guard';

//Component
import { RetrieveComponent } from './components/login/retrieve/retrieve.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { Page404Component } from './components/shared/page404/page404.component';
import { SigninComponent } from './components/login/signin/signin.component';

const routes: Routes = [  
{path:'', component:LoginComponent,
children:[
  {path:'login', component:SigninComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'register', component:SignupComponent}
]
},
{path:'retrieve', component:RetrieveComponent},
{path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), PagesModule, ContentPrincipalModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
