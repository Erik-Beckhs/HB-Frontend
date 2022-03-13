import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
idSurvey!:string

  constructor(
    private http:HttpClient
  ) { }

  getSurveyAndSectionByIdSurvey(is:string){
    let url=`${URL_SERVICE}/api/surveys?filter={"where": {"and": [{"id": "${is}"}]}, "include":"sections"}`
    return this.http.get(url) 
  }

  getQueriesByIdSection(idSection:any){
    let url = `${URL_SERVICE}/api/sections/${idSection}/queries`
    return this.http.get(url)
  }

  getQueriesAndOptionsByIdQuery(idQuery:any){
    let url=`${URL_SERVICE}/api/querys?filter={"where": {"and": [{"id": "${idQuery}"}]}, "include":"options"}`
    return this.http.get(url)
    .pipe(map((res:any)=>{return res[0]}))
  }

  getIdProdListByIdAnswer(idAnswer:any){
    let url=`${URL_SERVICE}/api/answers/${idAnswer}/answerProdServs`
    return this.http.get(url)
  }

  getAnswerSurveyByIdAnswerAndIdQueryFindOne(idAnswer:any, idQuery:any){
    let url = `${URL_SERVICE}/api/answerSurveys/findOne?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idQuery]=${idQuery}`;
    return this.http.get(url);
  }

  getAnswerSurveyByIdAnswerAndIdQuery(idAnswer:any, idQuery:any){
    let url = `${URL_SERVICE}/api/answerSurveys?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idQuery]=${idQuery}`;
    return this.http.get(url);
  }


  countAnswerSurveyByIdAnswerAndIdQuery(idAnswer:any, idQuery:any){
    //let url=`${URL_SERVICE}/api/answerProdServs/count?where={"idAnswer":${idAnswer}, "idProdServ":"${idProdServ}"}`;
    //http://localhost:3000/api/answerSurveys/count?where=%7B%22idAnswer%22%20%3A%207%2C%20%22idQuery
    let url = `${URL_SERVICE}/api/answerSurveys/count?where={"idAnswer":${idAnswer}, "idQuery":"${idQuery}"}`;
    return this.http.get(url);
  }

  countAnswerSurveyByIdAnswer(idAnswer:any){
    let url = `${URL_SERVICE}/api/answerSurveys/count?where={"idAnswer":${idAnswer}}`;
    //http://localhost:3000/api/answerSurveys/count?where
    return this.http.get(url)
  }

  updateAnswerSurvey(answerSurvey:any){
    let id = answerSurvey.id;
    let url = `${URL_SERVICE}/api/answerSurveys/${id}`;
    return this.http.patch(url, {answer1 : answerSurvey.answer1});
  }

  createAnswerSurvey(answerSurvey:any){
    let url = `${URL_SERVICE}/api/answerSurveys`;
    return this.http.post(url, answerSurvey);
  }

  deleteAnswerSurvey(id:any){
    let url = `${URL_SERVICE}/api/answerSurveys/${id}`;
    return this.http.delete(url);
  }

  getSurveyByIdQuot(idQuotation:any){
    let url = `${URL_SERVICE}/api/quotations/${idQuotation}/survey`;
    return this.http.get(url);
  }


  //metodos para answerSurvey 

  //lista de respuestas de proveedores dada una cotizacion
  AnswersGralByIdQuotation(idQuotation:any){
    let url = `${URL_SERVICE}/api/answerSurveys/RespuestasProveedores?idQuotation=${idQuotation}`;
    return this.http.get(url);
  }

  SuppliersListSurvey(idQuotation:string){
    let url = `${URL_SERVICE}/api/answerSurveys/SuppliersListSurvey?idQuotation=${idQuotation}`;
    return this.http.get(url);
  }

  QuerysByIdQuot(idQuotation:string){
    let url = `${URL_SERVICE}/api/answerSurveys/QuerysListSurveyByIdQuot?idQuotation=${idQuotation}`;
    return this.http.get(url);
  }

  ListAnswerByIdQuotAndIdQuery(idQuot:any, idQuery:any){
    let url = `${URL_SERVICE}/api/answerSurveys/AnswerByIdQuotAndIdQuery?idQuotation=${idQuot}&idQuery=${idQuery}`;
    return this.http.get(url);
  }

  ///aux
  createAnswerSurveyAux(answerSurvey:any){
    let url = `${URL_SERVICE}/api/answerSurveyAuxs`;
    return this.http.post(url, answerSurvey);
  }

  deleteAnswerSurveyAux(id:any){
    let url = `${URL_SERVICE}/api/answerSurveyAuxs/${id}`;
    return this.http.delete(url);
  }

  getAnswerSurveyAux(idAnswer:number, idQuery:string){
    let url = `${URL_SERVICE}/api/answerSurveyAuxs?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idQuery]=${idQuery}`;
    return this.http.get(url);
  }

  updateAnswerSurveyAux(answerSurveyAux:any){
      let url = `${URL_SERVICE}/api/answerSurveyAuxs/${answerSurveyAux.id}`;
      return this.http.patch(url, {answer:answerSurveyAux.answer});
  }
}
