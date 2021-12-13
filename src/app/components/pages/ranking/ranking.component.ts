import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
 @Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'supplier', 'contact', 'country', 'participations', 'pts', 'winner'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
}

const users: any[] = [
  {position: 1, supplier: 'Toshiba', contact: 'Alfredo Benavides', country: 'Colombia', participations:10, pts:'305.5', winner:6},
  {position: 2, supplier: 'Bosch SRL', contact: 'Carla Díaz', country: 'Ecuador', participations:4, pts:'130', winner:4},
  {position: 3, supplier: 'DELL', contact: 'Efraín Fernandez', country: 'Guatemala', participations:7, pts:'125.5', winner:4},
  {position: 4, supplier: 'Skill', contact: 'Griselda Hong', country: 'Tailandia', participations:9, pts:'100', winner:3},
  {position: 5, supplier: 'Maersk', contact: 'Irvin Jaramillo', country: 'Mexico', participations:15, pts:'83.4', winner:3},
  {position: 6, supplier: 'Windsor', contact: 'Kenia Lima', country: 'Uruguay', participations:12, pts:'56.3', winner:3},
  {position: 7, supplier: 'Lenovo', contact: 'Mario Narvaez', country: 'Puerto Rico', participations:3, pts:'40', winner:1},
  {position: 8, supplier: 'HP', contact: 'Otilia Paredes', country: 'Bolivia', participations:6, pts:'12', winner:0},
  {position: 9, supplier: 'Kuhene & Nagel', contact: 'Quino Reintsch', country: 'El Salvador', participations:4, pts:'10.4', winner:0},
  {position: 10, supplier: 'Bago', contact: 'Susana Tapia', country: 'Uruguay', participations:1, pts:'5', winner:0}
];
