import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QuotationService } from 'src/app/services/service.index';
import { RejectedSuppliersComponent } from '../../dialogs/rejected-suppliers/rejected-suppliers.component';

@Component({
  selector: 'app-quotation-gral',
  templateUrl: './quotation-gral.component.html',
  styleUrls: ['./quotation-gral.component.css']
})
export class QuotationGralComponent implements OnInit {
  loading:boolean = true;
  listQuot:any[]=[];

  displayedColumns: string[] = ['#', 'name', 'applicant', 'division', 'money', 'typeReq', 'start', 'end', 'estado', 'aceptados', 'rechazados', 'en_curso', 'total'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _quotation:QuotationService,
    public dialog:MatDialog
  ) { 

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadQuotationList();
    this.dataSource=new MatTableDataSource(this.listQuot);
  }

  loadQuotationList(){
    this._quotation.getQuotationGral().subscribe((res:any)=>
    {
      //console.log(res);
      if(res.length>0){
        console.log(res);
        this.listQuot = res;
        this.dataSource=new MatTableDataSource(this.listQuot);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
      else{
        this.loading = false;
      }
    }
    )
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
      'badge-success' : value == 'en curso',
      'badge-danger' : value == 'expiró'
    }
  }

  showRejected(element:any){
    if(element.rechazados > 0){
      this.dialog.open(RejectedSuppliersComponent, 
        {
          width:'50%',
          data:element
        });
    }
  }

}
