import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { QuotationInterface } from 'src/app/models/quotation.interface';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  idQuot:any=''
  quotation!:QuotationInterface

  constructor(private http:HttpClient) { 
    this.idQuot = localStorage.getItem('idQuot');
  }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type' : 'application/json'
  })

  //Obtiene el registro de cotizacion dado el id
  getQuotationById(idQuotation:any){
    const url=`${URL_SERVICE}/api/quotations/${idQuotation}`;
    return this.http.get(url);
  }

  //Devuelve las cotizaciones en las que participa el proveedor (parametro de envio id de proveedor)
  getQuotationsBySupplierId(idSupplier:any){
    let url=`${URL_SERVICE}/api/answers?filter=[where][idSupplier]=${idSupplier}`
    return this.http.get(url)
    // .pipe(map((res:any)=>{
    //   return res[0];
    // }
    // ))
  }

  //Guarda el id de cotizacion en el localstorage
  setIdQuot(iq:any){
    //this.idQuot=iq
    localStorage.setItem('idQuot', iq)
  }

  //devuelve el id de cotizacion del localstorage
  getIdQuotation(){
    return localStorage.getItem('idQuot')
  }

  //devuelve un observable que contiene el listado de answers a partir del envio de id de cotizacion
  getAnswersByIdQuot(idQuot:any){
    let url = `${URL_SERVICE}/api/quotations/${idQuot}/answers`
    return this.http.get(url)
    .pipe(map((res:any)=>{
      if(res.length==1){
        return res[0];
      }
    }))
  }

  getAnswerByIdQuotAndIdSupplier(idQuot:string, idSupplier:string){
    // let iq='c_002';
    // let is='_wnoxir4xu';
    let url=`${URL_SERVICE}/api/answers/findOne?filter[where][and][0][idQuotation]=${idQuot}&filter[where][and][1][idSupplier]=${idSupplier}`
    return this.http.get(url);
  }

  //modifica la tabla answer
  updateAnswer(answer:any){
    let id=answer.id;
    let url = `${URL_SERVICE}/api/answers/${id}`;
    return this.http.patch(url, answer);
  }

  //obtiene los productos de una cotizacion
  getProductsAssocQuotation(idQuot:any){
    let url = `${URL_SERVICE}/api/quotations/${idQuot}/productServices`;
    return this.http.get(url);
  }
}
