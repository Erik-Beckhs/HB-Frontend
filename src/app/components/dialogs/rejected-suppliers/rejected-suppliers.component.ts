import { AfterViewInit, Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AnswerService } from 'src/app/services/others/answer.service';

@Component({
  selector: 'app-rejected-suppliers',
  templateUrl: './rejected-suppliers.component.html',
  styleUrls: ['./rejected-suppliers.component.css']
})
export class RejectedSuppliersComponent implements OnInit, AfterViewInit {
  loading:boolean = true;
  listReject:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['#', 'supplier', 'response_date', 'name_term', 'comment', 'reason'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private _answer:AnswerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  ngOnInit(): void {
    this.loadRejected();
    this.dataSource=new MatTableDataSource(this.listReject);
  }

  loadRejected(){
    this._answer.getSupplierRejectedByIdQuot(this.data.id).subscribe((res:any)=>{
      if(res.length>0){
        console.log(res);
        this.listReject = res;
        this.dataSource=new MatTableDataSource(this.listReject);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
      else{
        this.loading = false;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

