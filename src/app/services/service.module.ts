import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ApplicantService,
  AuthService,
  ContactsService,
  LoginService,
  QuotationService,
  SuppliersService,
  SettingsService,
  SidebarService,
  ListService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  providers:[
    ApplicantService,
    AuthService,
    ContactsService,
    LoginService,
    QuotationService,
    SuppliersService,
    ListService,
    SettingsService,
    SidebarService,
  ]
})
export class ServiceModule { }
