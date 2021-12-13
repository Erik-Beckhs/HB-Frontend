import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerSendService {
  private show:boolean = false
  public state:number = 0

  constructor() { }

  get stateModal(){
    return this.show;
  }

  openModal(){
    this.show = true;
  }

  closeModal(){
    this.show = false;
  }

}
