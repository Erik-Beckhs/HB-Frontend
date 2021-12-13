import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public loading:boolean = true
  
  constructor() { }
}
