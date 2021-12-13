import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[
    {title:'Informacion General', icon:'supervised_user_circle', url:'/pages/general'},
    {title:'Hansa Business', icon:'business_center', 
    submenu:[
            {
            title:'Proveedor',
            url:'/pages/business/notRegistered'
            },
            {
              title:'Ranking',
              url:'/pages/ranking'
            }
          ]},
      {title:'Pago y Facturación', icon:'payment', url:'/pages/pays'},
      {title:'Contraseña', icon:'security', url:'/pages/password'},
      {title:'Configuracion y privacidad', icon:'settings', url:'/pages/settings'}
      ]
  
  constructor() {

   }
}
