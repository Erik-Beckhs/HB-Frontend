import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { QuotationService } from 'src/app/services/service.index';

@Component({
  selector: 'app-content-side',
  templateUrl: './content-side.component.html',
  styleUrls: ['./content-side.component.css']
})
export class ContentSideComponent implements OnInit {
  idQuot:any
  quotation:QuotationInterface = {
    money:''
  }
  date = new Date()

  start:any
  end = new Date();

  monthStart:any
  monthEnd:any
  dayStart:any
  dayEnd:any

  constructor(
    private route:ActivatedRoute,
    private _quotation:QuotationService
    ) { 
      this.route.paramMap.subscribe(params=>{
        if(params.has("id")){
          //console.log(params.get("id"))
            this.idQuot=params.get("id");

            //seteamos el idcot
            this._quotation.idQuot = this.idQuot;
            this._quotation.setIdQuot(this.idQuot);

            this._quotation.getQuotationById(this.idQuot).subscribe((res:any)=>{
              this.quotation=res;
              // let fecha = res.start
              // this.start = fecha.toLocaleString('en-us', { month: 'long' });
              const start = new Date(res.start);  // 2009-11-10
              const end = new Date(res.end);
              //this.dayStart = 
              this.monthStart = start.toLocaleString('es-us', { month: 'long' });
              this.monthEnd = end.toLocaleString('es-us', { month: 'long' });
              this.dayStart = ('0'+ start.getDate()).slice(-2);
              this.dayEnd = ('0' + end.getDate()).slice(-2);
              //this.monthEnd = 
              //console.log(month);
          })
        }
        else{
          console.log("No existe el parametro id")
        }
      })
    }

  ngOnInit(): void {
 
  }

}
