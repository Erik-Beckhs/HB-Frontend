import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { QuoteInterface } from 'src/app/models/quote.interface';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { QuotationService, ContactsService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-myquotations',
  templateUrl: './myquotations.component.html',
  styleUrls: ['./myquotations.component.css']
})

export class MyquotationsComponent implements OnInit, AfterViewInit {
  loading:boolean = true;
  
  answers:any[]=[];
  quotation!:QuotationInterface;
  quotations:any[]=[];
  array:QuoteInterface = {
    pos:0
  };

  arrayList:QuoteInterface[]=[];

  //private user!:any;
  contact:any;

  supplier:SupplierInterface[]=[];

  applicant:any;

  displayedColumns: string[] = ['position', 'name', 'mystate', 'applicant', 'money', 'tipocot','auction', 'fechaini', 'fechafin', 'statequot'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _quotation:QuotationService,
    private _contact:ContactsService,
    private router:Router,
    private title:Title
    ) { 
      this.title.setTitle('Mis Cotizaciones')
      //this.dataSource = new MatTableDataSource(this.arrayList);
  }


  ngOnInit(){
    this.loading = true
    this.contact=this._contact.contact;
    this.loadQuotations(this.contact.suppliers.id);
    this.dataSource = new MatTableDataSource(this.arrayList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  styleState(value:any){
    return {
      'badge-success' : value == 1 || value == 2 || value == 3,
      'badge-danger' : value == 4 || value == 5 || value==9,
      'badge-info': value ==7,
      'badge-dark' : value = 6
    }
  }

  styleStateQuot(value:any){
    return {
      'badge-info' : value == 1,
      'badge-success' : value == 2,
      'badge-danger' : value == 3
    }
  }

  auctionStyle(value:any){
    return {
      'bg-success' : value == 1,
      'bg-danger' : value == 0
    }
  }

  routing(quotation:any){
    
    let id = quotation.id;

    if(quotation.auction == 1){ //tiene subasta
      if(quotation.statequot == 1){ //en espera
        //mandar a sala de espera
        this.router.navigate(['cot-principal/content-side', id, 'lobby']);
      }
      else if(quotation.statequot == 2){ // en curso
        // estados aceptado, rechazado, respondido, anulado
        // invitado
        //2 respondido
        //4 rechazado
        //7 aceptado sin responder
        //9 abandonado
        if(quotation.mystate == 1){
          this.router.navigate(['cot-principal/content-side', id, 'content-info']);
        }
        else if(quotation.mystate == 2){
          this.router.navigate(['cot-principal/content-side', id, 'auction']);
        }
        else if(quotation.mystate == 4){
          swal("HANSA Business", "No puede acceder a la cotización debido a que ya la rechazó", "error");
        }
        else if(quotation.mystate == 7){
          this.router.navigate(['cot-principal/content-side', id, 'auction']);
        }
        else if(quotation.mystate == 9){
          swal("HANSA Business", "No puede acceder a la cotización debido a que la abandonó antes de su conclusión", "error");
        }
        else{
          swal ("HANSA Business", "Ocurrió un error", "error");
        }

      }
      else if(quotation.statequot == 3){
        // estados ganada la cotizacion o concluyo la cotizacion
        if(quotation.mystate == 3){
          //gano la cot
          swal("Felicidades!!!", "Usted ha ganado la cotización, en el transcurso de los dias se le enviará una notificación, este atento!!!", "success")
        }
        else{
          //la cot ha concluido
          swal("HANSA Business", "La cotización ha concluido", "info");
        }
      }
      else{
        swal("HANSA Business", "Ocurrió un error", "error");
      }
    }
    else{ // sin subasta
      if(quotation.statequot == 1){ //en espera
        swal("HANSA Business","Aún no ha iniciado la cotización","info");
      }
      else if(quotation.statequot == 2){ // en curso
        //2 respondido
        //4 rechazado
        //7 aceptado sin responder
        //9 abandonado

        if(quotation.mystate == 1){
          this.router.navigate(['cot-principal/content-side', id, 'content-info']);
        }
        else if(quotation.mystate == 2){// 
          //mandar a subasta pero debe mostrar alert
          this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
        }
        else if(quotation.mystate == 4){
          swal("HANSA Business", "No puede acceder a la cotización debido a que ya la rechazó", "error");
        }
        else if(quotation.mystate == 7){
          //mandar a subasta
          this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
        }
        else if(quotation.mystate == 9){
          swal("HANSA Business", "No puede acceder a la cotización debido a que la abandonó", "error");
        }
      }
      else if(quotation.statequot == 3){
        // estados ganada la cotizacion o concluyo la cotizacion
        if(quotation.mystate == 3){
          //gano la cot
          swal("Felicidades!!!", "Usted ha ganado la cotización, en el transcurso de los dias se le enviará una notificación, este atento!!!", "success")
        }
        else{
          //la cot ha concluido
          swal("HANSA Business", "La cotización ha concluido", "info");
        }
      }
      else{
        swal("HANSA Business", "Ocurrió un error", "error");
      }
    }

    //envia a subastas

    // if(quotation.auction == 1 && quotation.state != 4 && quotation.state != 2){
    //   let now = new Date();
    //   let start = new Date(quotation.start) 
    //   let end = new Date(quotation.end) 

    //   if(now >= start && now <= end ){
    //     console.log('Estamos en fecha, dirige a subasta');
    //     this.router.navigate(['cot-principal/content-side', id, 'auction']);
    //   }
    //   else if (now < start){
    //     console.log('Envia a sala de espera');
    //     this.router.navigate(['cot-principal/content-side', id, 'lobby']);
    //   }
    //   else if (now > start){
    //     swal("HANSA Business", "La subasta culminó", "error")
    //   }
    //   else{
    //     console.log('no dirige a ningun lado');
    //   }
    // }
    // else{
    //   let state = quotation.state;

    //   this._quotation.idQuot = id;
    //   localStorage.setItem('idQuot', id);
  
    //   //redireccionamos por estado
    //   switch(state){
    //     case 1:
    //       this.router.navigate(['cot-principal/content-side/', id]);
    //       break;
    //     case 2: //permite ingresar a respuestas de cotizacion pero las respuestas estaran bloqueadas debido a que ya respondió
    //       this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
    //       break;
    //     case 4:
    //       //this.router.navigate(['cot-principal/content-info', id]);
    //       swal("HANSA Business", "No puede acceder a la cotización debido a que ya la rechazó", "error")
    //       break;
    //       // this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
    //       // break;
    //       case 5:
    //       swal("HANSA Business", "La cotizacion concluyó", "info");
    //       //this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
    //       //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
    //       break;
    //     case 6:
    //       this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
    //       //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
    //       break;
    //     case 7:
    //         this.router.navigate([`cot-principal/content-side/${id}/content-info/quotation`]);
    //         //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
    //         break;
    //     case 9:
    //       swal("HANSA Business", "No puede acceder a la cotización debido a que la abandonó", "error")
    //       break;
    //     default:
    //       console.log('ruta no existente');
    //       break;
    //   }
    // }

  }

  //metodo que carga el listado de cotizaciones en el arrayList de cotizaciones
  loadQuotations(idSupplier:any){
    this._quotation.getQuotationListBySupplier(idSupplier).subscribe((res:any)=>{
      let now = new Date();
      if(res.length > 0){
        for(let i=0; i<res.length; i++){
          let end2 = new Date(res[i].end)
  
          // if((res[i].state !== 3 && res[i].state !== 4 && res[i].state !== 9) && (end2 < now || end2 == now)){
          //   res[i].state = 5 //estado de concluyo la cot
          // }
  
          if(i == res.length-1){
            this.arrayList = res;

            this.dataSource = new MatTableDataSource(this.arrayList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
      
            this.loading = false;
          }
        }
      }
      else{
        this.loading = false;
      }
    })
  } 

}

