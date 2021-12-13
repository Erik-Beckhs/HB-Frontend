import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerSendService } from 'src/app/services/service.index';

@Component({
  selector: 'app-answer-send',
  templateUrl: './answer-send.component.html',
  styleUrls: ['./answer-send.component.css']
})
export class AnswerSendComponent implements OnInit {
  public state:number = 0 ; 

  constructor(
    public _answerSend:AnswerSendService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.state = this._answerSend.state
  }

  closeModal(){
    this._answerSend.closeModal();
    this.router.navigate(['cot-principal']);
  }

  styleState(){
    return {
      'bg-success' : this.state==0,
      'bg-danger' : this.state==1
    }
  }

}
