import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  constructor(private http:HttpClient) { }

  getOCByIdSupplier(idSupplier:any){
    let url=`${URL_SERVICE}/api/ordenCompras/ListadoDeOrdenesdeCompraPorProveedor?idSupplier=${idSupplier}`;
    return this.http.get(url);
  }

  payListByIdOC(idOC:string){
    let url = `${URL_SERVICE}/api/payments/PayList?idOC=${idOC}`;
    return this.http.get(url);
  }
}
