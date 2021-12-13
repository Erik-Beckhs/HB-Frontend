import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationStart } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { QuotationService } from 'src/app/services/service.index';

@Component({
  selector: 'app-content-info',
  templateUrl: './content-info.component.html',
  styleUrls: ['./content-info.component.css']
})
export class ContentInfoComponent implements OnInit {
  idQuot:any
  // quotation:QuotationInterface = {
  //   money:''
  // }
  // date = new Date()

  constructor(
    private route:ActivatedRoute,
    private _quotation:QuotationService
    ) {
      this.idQuot = this._quotation.idQuot
      //this.route.paramMap.subscribe(params=>{
        // if(params.has("id")){
        //   //console.log(params.get("id"))
        //   this.idQuot=params.get("id")
        //   this._quotation.getQuotationById(this.idQuot).subscribe(res=>{
        //     this.quotation=res
        //     //console.log(this.quotation)
        //   })
        // }
        // else{
        //   console.log("No existe el parametro id")
        // }
      //})
     }

  ngOnInit(): void {

  }
}
