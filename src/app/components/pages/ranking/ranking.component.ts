import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SuppliersService } from 'src/app/services/service.index';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
 @Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, AfterViewInit  {
  listSupplier:RankingInterface[] = [];
  supplier!:RankingInterface;
  loading:boolean = true;

  displayedColumns: string[] = ['position', 'img', 'supplier', 'country', 'participations', 'pts', 'winner'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _supplier:SuppliersService
  ) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadRanking();
    this.dataSource=new MatTableDataSource(this.listSupplier);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadRanking(){
    let c = 0
    this._supplier.getSuppliers().subscribe((res:any)=>{
      if(res.length > 0){
        for(let r of res){
          c++;
          this._supplier.countAnswerByIdSupplier(r.id).subscribe(resp=>{
            //console.log('Cantidad de participaciones')
            this._supplier.countAnswerWinnerByIdSupplier(r.id).subscribe(resp2=>{
              this.supplier = {
                supplier : r.name,
                img:r.img,
                country:r.country,
                pts:0,
                winner:resp2,
                participations : resp
              }
    
              this.listSupplier.push(this.supplier)
    
              if(c == res.length){
  
                this.listSupplier.sort((a, b) => b.winner - a.winner);
                this.dataSource=new MatTableDataSource(this.listSupplier);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;

                this.loading = false;
              }
            })
            
          })
  
        } 
      }
      else{
        this.loading = false;
      }


    })
  }

}

class RankingInterface {
  img?:string
  supplier?:string
  country?:string
  participations?:number
  pts?:number
  winner?:any
}