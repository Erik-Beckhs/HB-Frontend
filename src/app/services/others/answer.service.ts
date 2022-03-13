import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http:HttpClient) { }

  //devuelve el listado de proveedores que rechazaron la cotizacion ademas del comentario de rechazo
  getSupplierRejectedByIdQuot(idQuotation:any){
    let url = `${URL_SERVICE}/api/answers/RejectedSuppliers?idQuotation=${idQuotation}`;
    return this.http.get(url);
  }

  //elimina respuesta a productos dado el idAnswer
  deleteAnswerProdsByIdAnswer(idAnswer:string){
    let url = `${URL_SERVICE}/api/answers/${idAnswer}/answerProdServs`;
    return this.http.delete(url);
  }

  //elimina respuesta a formulario de pregs dado el idAnswer
  deleteAnswerSurveyByIdAnswer(idAnswer:string){
    let url = `${URL_SERVICE}/api/answers/${idAnswer}/answerSurveys`;
    return this.http.delete(url);
  }

  //elimina respuesta a documentos dado el idAnswer
  deleteAnswerDocsByIdAnswer(idAnswer:string){
    let url = `${URL_SERVICE}/api/answers/${idAnswer}/answerDocs`;
    return this.http.delete(url);
  }

}
