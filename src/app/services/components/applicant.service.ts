import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http:HttpClient) { }
  headers:HttpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  })

  getApplicantById(idApplicant:any){
    const url=`${URL_SERVICE}/api/applicants/${idApplicant}`
    return this.http.get(url)
  }
}
