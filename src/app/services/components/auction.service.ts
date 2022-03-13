import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  public _refresh$ = new Subject<void>()

  //public showRules:boolean = false;
  
  constructor(private http:HttpClient) { }

  setBid(bid:any):Observable<any>{
    let url = `${URL_SERVICE}/api/bidAnswers`;
    return this.http.post(url, bid).pipe(
      tap(()=>{
        this._refresh$.next();
      }))
  }
  
  getBid(idAnswer:any){
    let url = `${URL_SERVICE}/api/answers/${idAnswer}/bidAnswers`;
    return this.http.get(url);
  }
}
