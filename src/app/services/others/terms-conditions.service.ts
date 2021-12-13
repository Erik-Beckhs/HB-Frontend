import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { TermsConditionsInterface } from 'src/app/models/termsConditions.interface';

@Injectable({
  providedIn: 'root'
})
export class TermsConditionsService {

  constructor(private http:HttpClient) {

   }

   getTermsAndConditionsByIdQuotation(idQuot:string){
    const url = `${URL_SERVICE}/api/quotations/${idQuot}/termsConditions`
    return this.http.get(url)
   }
   
  //modifica los terminos y condiciones
  updateTermsAndConditions(term:any){
    let id=term.id;
    let url = `${URL_SERVICE}/api/termConditions/${id}`;
    return this.http.patch(id, term);
  }

  updateAnswerTermsConditions(term:TermsConditionsInterface){
    let idAnswerTerm = term.idAnswerTerm
    let url = `${URL_SERVICE}/api/answerTermss/${idAnswerTerm}`
    return this.http.patch(url, term)
  }

  saveAnswerTermsConditions(term:TermsConditionsInterface){
    let url = `${URL_SERVICE}/api/answerTermss`
    return this.http.post(url, term)
  }

  //devuelve las respuestas a terminos y condiciones dado el id Answer o id de respuesta
  // getAnswerTermsByIdAnswer(idAnswer:any){
  //   let url=`${URL_SERVICE}/api/answers/${idAnswer}/answerTerms`;
  //   return this.http.get(url);
  // }
  getAnswerTermsByIdAnswerAndIdTerm(idAnswer:any, idTerm:any){
    let url = `${URL_SERVICE}/api/answerTermss/findOne?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idTerm]=${idTerm}`;
   // let url = `${URL_SERVICE}/api/answerProdServs/findOne?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idProdServ]=${idProdServ}`;
    return this.http.get(url);
  }
}
