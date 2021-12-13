import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { QuotationService } from 'src/app/services/service.index';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
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
    private router:Router,
    private _quotation:QuotationService,
    ) { }

  ngOnInit(): void {
    this.idQuot=this._quotation.idQuot;

    this._quotation.getQuotationById(this.idQuot)
    .subscribe((res:any)=>
    {
      //this.quotation = res;
      //this.quotation.start = new Date(res.start)
      //console.log(this.quotation);
      this.end = new Date(res.end);
      //console.log(this.start);
      //const start:any = new Date(res.start);
    }
    );
  }

  x = setInterval(() => {
    let now = new Date().getTime();
    //this.start = new Date('dec 03, 2021 11:55:00');
    this.difference = this.end.getTime() - now;
    let days = Math.floor(this.difference/(1000*60*60*24));
    let hours = Math.floor((this.difference % (1000*60*60*24)) / (1000*60*60));
    let mins = Math.floor((this.difference % (1000*60*60)) / (1000*60));
    let seconds = Math.floor((this.difference % (1000*60)) / (1000));
    this.time = `${days}d ${hours}h ${mins}m ${seconds}s`;
    if(this.difference < 0){
      clearInterval(this.x);
      //this.router.navigate(['/cot-principal/content-side/', this.idQuot, 'auction']);
    }
  });

}
