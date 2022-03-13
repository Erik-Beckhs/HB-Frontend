import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { Observable } from 'rxjs';
import { URL_SERVICE } from 'src/app/config/config';

import swal from 'sweetalert';
import { ContactsService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  supplier!:SupplierInterface;

  constructor(
    private http:HttpClient,
    private authService:AuthService,
    private _contact:ContactsService
    ) { }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });

  //crea un nuevo proveedor
  registerSupplier(supplier:SupplierInterface){
    let url = `${URL_SERVICE}/api/suppliers`;
    return this.http.post(url, supplier).pipe(map(res=>
      {
        //setear contacto y localstorage
        this._contact.contact.suppliers=res;
        this._contact.setContact(this._contact.contact);
        swal("HANSA Business", "Se registró su proveedor de manera exitosa", "success").then(res=>location.reload());
      }
      ))
  }

  //obtiene el Proveedor a partir del id de contacto
  getSupplierByContactId(contactId:any){
    let url = `${URL_SERVICE}/api/suppliers?filter[where][idContact]=${contactId}`;
    return this.http.get(url).pipe(map((res:any)=>{
      res[0];
    }));
  }

  //devuelve el proveedor dado su id y las cotizaciones en las que participa
  getQuotationsByIdSupplier(idSupplier:any){
    let url=`${URL_SERVICE}/api/suppliers?filter={"where": {"and": [{"id": "${idSupplier}"}]}, "include":"answers"}`;
    return this.http.get(url);
  }

  // //devuelve al proveedor asociado al contacto
  // getSupplierByIdContact(idContact:any):Observable<any>{
  //   let url=`${URL_SERVICE}/api/contacts/${idContact}/suppliers`;
  //   return this.http.get(url);
  // }

  //actualiza la informacion del proveedor
  updateSupplier(idSupplier:any, supplier:SupplierInterface) {
    let url = `${URL_SERVICE}/api/suppliers/${idSupplier}`;
    //const url_api = `http://localhost:3000/api/suppliers/${supplierId}?access_token=${token}`;
    return this.http
      .patch(url, supplier).pipe(
        map(res=>{
          swal("HANSA Business", "Se actualizó su información de manera correcta", "success");
          return res;
        }));
  }

  //actualiza la imagen
  updateImage(file:object, idSupplier:string){ 
    let url = `${URL_SERVICE}/api/suppliers/${idSupplier}`;
    //const url_api = `http://localhost:3000/api/suppliers/${supplierId}?access_token=${token}`;
    return this.http
      .patch(url, file).pipe(
        map(res=>{
          swal("HANSA Business", "Se actualizó su imagen de manera exitosa", "success");
          return res;
        }));
  }

  getSuppliers(){
    let url = `${URL_SERVICE}/api/suppliers`;
    return this.http.get(url);
  }

  countAnswerByIdSupplier(idSupplier:any){
    let url = `${URL_SERVICE}/api/answers/count?where={"idSupplier":"${idSupplier}"}`;
    return this.http.get(url).pipe(
      map((res:any)=>{return res.count})
    )
  }

  countAnswerWinnerByIdSupplier(idSupplier:string){
    //estado 3 es asignado a proveedores que ganaron la cotizacion
    //let state = 3;
    let url = `${URL_SERVICE}/api/answers/CantidadCotizacionesGanadas?idSupplier=${idSupplier}`;
    //let url = `${URL_SERVICE}/api/answers/count?where={"idSupplier":"${idSupplier}" , "state":${state}}`;
    return this.http.get(url).pipe(
      map((res:any)=>
        {
          return res[0].count
        }
        )
    )
  }
  

}
