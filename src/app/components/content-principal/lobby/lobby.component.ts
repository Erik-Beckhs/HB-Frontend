import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { AuctionService, QuotationService } from 'src/app/services/service.index';
//import * as countdown from 'countdown';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  idQuot!:string;
  quotation!:QuotationInterface;
  start:any;
  end:any;

  time:any;
  difference!:number;

  yearStart:any;
  monthStart:any;
  monthEnd:any;
  dayStart:any;
  dayEnd:any;

  constructor(
    private _quotation:QuotationService,
    private router:Router,
    //private _rules:AuctionService
    ) { }

  ngOnInit(): void {
    this.idQuot=this._quotation.idQuot;
    //this.start = new Date();

    this._quotation.getQuotationById(this.idQuot)
    .subscribe((res:any)=>
    {
      this.quotation = res;
      //this.quotation.start = new Date(res.start)
      //console.log(this.quotation);
      this.start = new Date(res.start);
      this.end = new Date(res.end);
      //console.log(this.start);
      //const start:any = new Date(res.start);
      this.dayStart = ('0'+ this.start.getDate()).slice(-2);
      this.monthStart = this.start.toLocaleString('es-us', { month: 'long' });
      this.yearStart=this.start.getFullYear();
    }
    );
  }

  x = setInterval(() => {
    let now = new Date().getTime();
    //this.start = new Date('dec 03, 2021 11:55:00');
    this.difference = this.start.getTime() - now;
    let days = Math.floor(this.difference/(1000*60*60*24));
    let hours = Math.floor((this.difference % (1000*60*60*24)) / (1000*60*60));
    let mins = Math.floor((this.difference % (1000*60*60)) / (1000*60));
    let seconds = Math.floor((this.difference % (1000*60)) / (1000));
    this.time = `${days} dias ${hours} hrs ${mins} mins ${seconds} segs`;
    if(this.difference < 0){
      clearInterval(this.x);
      this.router.navigate(['/cot-principal/content-side/', this.idQuot, 'content-info']);
      //this.router.navigate(['/cot-principal/content-side/', this.idQuot, 'auction']);
      //this._rules.showRules = true;
    }
  });

  jump(){
    this.router.navigate(['/cot-principal/content-side/', this.idQuot, 'content-info']);
    //this.router.navigate(['/cot-principal/content-side/', this.idQuot, 'auction']);
  }
}
