import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  notificacion = new EventEmitter<any>()

  constructor(private http:HttpClient) { }

  //Devuelve el producto dado su ID
  getProductById(idProd:string){
    let url = `${URL_SERVICE}/api/prodservices/${idProd}`
    return this.http.get(url)
  }

  countAnswerProdServByIdAnswerAndIdProdServ(idAnswer:any, idProdServ:any){
    let url=`${URL_SERVICE}/api/answerProdServs/count?where={"idAnswer":${idAnswer}, "idProdServ":"${idProdServ}"}`;
    return this.http.get(url)
    //{"where" : {"idAnswer" : 4, "idProdServ" : "p_001"}}
  } 

  //Obtiene el unico registro que contiene al producto a responder
  getAnswerProdServByIdAnswerAndIdProdServ(idAnswer:any, idProdServ:any){
    let url = `${URL_SERVICE}/api/answerProdServs/findOne?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idProdServ]=${idProdServ}`;
    return this.http.get(url);
  }  

  updateAnswerProds(idAnswerProd:any, answerProd:any){
    let url = `${URL_SERVICE}/api/answerProdServs/${idAnswerProd}`;
    return this.http.patch(url, answerProd)
  }

  createAnswerProd(answerProd:any){
    let url = `${URL_SERVICE}/api/answerProdServs`;
    return this.http.post(url, answerProd)
  }
}
