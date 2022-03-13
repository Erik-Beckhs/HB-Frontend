import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TracingService } from 'src/app/services/components/tracing.service';

@Component({
  selector: 'app-tracing',
  templateUrl: './tracing.component.html',
  styleUrls: ['./tracing.component.css']
})
export class TracingComponent implements OnInit {
  listShipment:any=[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _tracing:TracingService
  ) { }

  ngOnInit(): void {
    this.loadTracing();
  }

  loadTracing(){
    this._tracing.getShipmentList(this.data.id).subscribe((res:any)=>
      {
        this.listShipment = res;
        for(let i in res){
          this._tracing.getEventsByidShipment(res[i].id).subscribe((resp:any)=>{
            if(resp.length > 0){
              this.listShipment[i].events = resp;
            }
            else{
              this.listShipment[i].events = []  
            }
          })
        }
        //console.log(this.listShipment);
      }
    )
  }

  styleEvent(value:any){
    return {
      'badge-success' : value == 'Concluido',
      'badge-warning' : value == 'Pendiente'
    }
  }
}
