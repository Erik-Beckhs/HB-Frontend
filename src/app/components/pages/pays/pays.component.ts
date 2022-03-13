import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { PaysService } from 'src/app/services/service.index';
import { PaymentDetailComponent } from '../../dialogs/payment-detail/payment-detail.component';
import { TracingComponent } from '../../dialogs/tracing/tracing.component';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit, AfterViewInit {
  supplier!:SupplierInterface;
  contact:any;
  listOC:any[]=[];
  loading:boolean = true;

  displayedColumns: string[] = ['#', 'name', 'applicant', 'date', 'total', 'money', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _pays:PaysService,
    public dialog: MatDialog
    ) { 
      this.getSupplier();
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  

  ngOnInit(): void {
    this.loadOC();
    this.dataSource=new MatTableDataSource(this.listOC);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  getSupplier(){
    let contact = localStorage.getItem('contact');
      if (contact !== null){
       this.contact =JSON.parse(contact);
       this.supplier = this.contact.suppliers;
      }
  }

  loadOC(){
    this._pays.getOCByIdSupplier(this.supplier.id).subscribe((res:any)=>{
      if(res.length>0){
        this.listOC = res

        this.dataSource=new MatTableDataSource(this.listOC);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
      else {
        this.loading = false;
      }
    })
  }

  showPay(element:any){
    this.dialog.open(PaymentDetailComponent, 
      {
        width:'50%',
        data:element
      });
  }

  showTracing(element:any){
    this.dialog.open(TracingComponent, 
      {
        width:'80%',
        data:element
      });
  }

}
