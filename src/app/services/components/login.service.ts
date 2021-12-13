import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
//import { isNullOrUndefined } from 'util'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  // headers:HttpHeaders= new HttpHeaders({
  //   'Content-type': 'application/json'
  // })
  // getContacts(){
  //   //const url="http://localhost:3000/users"
  //   //const url="http://localhost:3000/contacts"
  //   const url="http://localhost:3000/api/contacts"
  //   console.log(url)
  //   return this.http.get<any>(url).toPromise()
  //   //return this.http.get<any>(url)
  // }
}
