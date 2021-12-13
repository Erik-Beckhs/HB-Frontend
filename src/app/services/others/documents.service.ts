import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private http:HttpClient) { }

  getDocumentsAssocQuotation(idQuot:string){
    let url=`${URL_SERVICE}/api/quotations/${idQuot}/docsRequireds`;
    return this.http.get(url);
  }

  countAnswerDocsByIdAnswerAndIdDoc(idAnswer:any, idDoc:any){
    let url=`${URL_SERVICE}/api/answerDocss/count?where={"idAnswer":${idAnswer}, "idDoc":"${idDoc}"}`;
    return this.http.get(url)
    //{"where" : {"idAnswer" : 4, "idProdServ" : "p_001"}}
  } 

  getAnswerDocumentByIdAnswerAndIdDocument(idAnswer:any, idDocument:any){
    let url = `${URL_SERVICE}/api/answerDocss/findOne?filter[where][and][0][idAnswer]=${idAnswer}&filter[where][and][1][idDoc]=${idDocument}`;
    //http://localhost:3000/api/answerDocss?filter=%7B%22where%22%3A%7B%22idAnswer%22%3A%225%22%2C%20%22idDoc
    return this.http.get(url);
  }

  updateAnswerDocument(idAnswerDoc:any, answerDocument:any){
    let url = `${URL_SERVICE}/api/answerDocss/${idAnswerDoc}`;
    return this.http.patch(url, answerDocument);
  }

  saveAnswerDocument(answerDocument:any){
    let url = `${URL_SERVICE}/api/answerDocss`;
    return this.http.post(url, answerDocument);
  }
}
