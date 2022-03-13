import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaysService } from 'src/app/services/service.index';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  pays:any[]=[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _pay:PaysService
  ) { 

  }

  ngOnInit(): void {
    //console.log(this.data);
    this.payList();
  }

  payList(){
    this._pay.payListByIdOC(this.data.id).subscribe((res:any)=>{
      //console.log(res);
      this.pays = res;
    })
  }

}
