//Modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './components/pages/pages.module';
import { SharedModule } from './components/shared/shared.module';
import { ContentPrincipalModule } from './components/content-principal/content-principal.module';

//Services
import { LoginService } from './services/service.index';

//Components
import { AppComponent } from './app.component';
import { RetrieveComponent } from './components/login/retrieve/retrieve.component';
import { LogoutUserComponent } from './components/dialogs/logout-user/logout-user.component';
import { PasswordComponent } from './components/pages/password/password.component';
import { RespuestasComponent } from './components/content-principal/respuestas/respuestas.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { Page404Component } from './components/shared/page404/page404.component';
import { SharedComponent } from './components/shared/shared.component';

//Services
import { ServiceModule } from './services/service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from './components/dialogs/dialogs.module';
//import { TermsConditionsHansaComponent } from './components/dialogs/terms-conditions-hansa/terms-conditions-hansa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    SignupComponent,
    RetrieveComponent,
    LogoutUserComponent,
    PasswordComponent,
    RespuestasComponent,
    Page404Component,
    SharedComponent,
    //TermsConditionsHansaComponent
    //SupplierPipe
  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    PagesModule,
    SharedModule,
    ContentPrincipalModule,
    ServiceModule,
    DialogsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
