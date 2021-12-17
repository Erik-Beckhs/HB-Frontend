import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ContactInterface } from 'src/app/models/contact.interface';
import { WebsocketService } from 'src/app/services/others/websocket.service';
import { AuctionService, ContactsService, QuotationService } from 'src/app/services/service.index';
//import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-auction-chart',
  templateUrl: './auction-chart.component.html',
  styleUrls: ['./auction-chart.component.css']
})
export class AuctionChartComponent implements OnInit{
  @Input() color:any
  idAnswer!:string

  idQuot:any;
  bids:any

  contact!:ContactInterface;

  suscription! : Subscription;
  // public lineChartData: ChartConfiguration['data'] = {
  //   datasets: [
  //     {
  //       data: [ 65, 59, 80, 81, 56, 55, 40 ],
  //       label: 'Bosch SRL',
  //       backgroundColor: 'rgba(148,159,177,0.2)',
  //       borderColor: 'rgba(148,159,177,1)',
  //       pointBackgroundColor: 'rgba(148,159,177,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  //       fill: 'origin',
  //     },
  //     {
  //       data: [ 28, 48, 48, 19, 86, 27, 130 ],
  //       label: 'Skill',
  //       backgroundColor: 'rgba(77,83,96,0.2)',
  //       borderColor: 'rgba(77,83,96,1)',
  //       pointBackgroundColor: 'rgba(77,83,96,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(77,83,96,1)',
  //       fill: 'origin',
  //     },
  //     {
  //       data: [ 48, 48, 19, 86, 27, 130, 35, 26 ],
  //       label: 'Tramontina',
  //       yAxisID: 'y-axis-1',
  //       backgroundColor: 'rgba(255,0,0,0.3)',
  //       borderColor: 'red',
  //       pointBackgroundColor: 'rgba(148,159,177,1)',
  //       pointBorderColor: '#fff',
  //       pointHoverBackgroundColor: '#fff',
  //       pointHoverBorderColor: 'rgba(148,159,177,0.8)',
  //       fill: 'origin',
  //     }
  //   ],
  //   labels: [ '18:50', '18:55', '19:05', '19:25', '20:00', '21:00', '22:00' ]
  // };
  public totals : any[]=[]
  public supplier!:string
  public hours:any[]=[]

  public lineChartData!: ChartConfiguration['data']

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       label: {
      //         position: 'center',
      //         enabled: true,
      //         color: 'orange',
      //         content: 'LineAnno',
      //         font: {
      //           weight: 'bold'
      //         }
      //       }
      //     },
      //   ],
      // }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // private static generateNumber(i: number): number {
  //   return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  // } 
  constructor(
    private _auction:AuctionService,
    private _contact:ContactsService,
    private _quotation:QuotationService,
    //private socket: Socket
    public _webSocket:WebsocketService
    ){
    //this.totals = [ 65, 30, 45 ];
    //this.supplier = 'Bosch';
    this.idQuot = localStorage.getItem('idQuot');
    this.supplier = this._contact.contact.suppliers.name;
    
    //this.hours = [ '18:50' , '19:50', '16:26'];
  }

  ngOnInit():void{

    //this.getAuctions()
    this.getAnswer();

    this.suscription = this._auction._refresh$.subscribe( () => {
      this.getAuctions();
    })

    this._webSocket.socket.on('oferta', (point:any) => {
      //this.socket.on('oferta', (point:any)=>{
      console.log(point);
      this.getAuctions();
    })

    //mostrar cuando se han conectado
    this._webSocket.socket.on('conectado', (point:any) => {
      //this.socket.on('oferta', (point:any)=>{
      console.log(point);
      //this.getAuctions();
    })


    // this._webSocket.socket.on('connect', (point:any) => {
    //   //this.socket.on('oferta', (point:any)=>{
    //   console.log('alguien se conectó'+point);
    //   //this.getAuctions();
    // })

  }

  getAnswer(){
    this._quotation.getAnswerByIdQuotAndIdSupplier(this.idQuot, this._contact.contact.suppliers.id)
      .subscribe((res:any)=>
      {
        this.idAnswer=res.id;

        //lo pusimos aqui por que demora en obtener la data de idAnswer y es necesario para la funcion
        this.getAuctions()
      }
    )
  }

  //Obtiene las ultimas 10 pujas
  getAuctions(){
    this._auction.getBid(this.idAnswer).subscribe((res:any)=>{
      this.bids = res ;
      this.totals = [] ;
      this.hours = [] ;
      let x = 0 ;

      //ultimas 10 pujas
      if(this.bids.length > 10){
        x = (this.bids.length)-10;
      }

      for(let i=x;i<this.bids.length;i++){
        this.totals.push(this.bids[i].total);
        this.hours.push(this.bids[i].datetime);
      }

      this.lineChartData = {
        datasets: [
          {
            data: this.totals, //totales
            label: this.supplier, //nombre de proveedor
            backgroundColor: `rgba(${this.color.a}, ${this.color.b}, ${this.color.c} ,0.2)`,
            borderColor: `rgba(${this.color.a}, ${this.color.b}, ${this.color.c} ,1)`,
            pointBackgroundColor: `rgba(${this.color.a}, ${this.color.b}, ${this.color.c} ,1)`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgba(${this.color.a}, ${this.color.b}, ${this.color.c} , 0.8)`,
            fill: 'origin',
          }
        ],
        labels: this.hours
      };
    })
  }


  // events
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }
}
