import { Component, OnInit } from '@angular/core';

declare function import_plugins():any

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() { 
    import_plugins()
  }

  ngOnInit(): void {
  }

}
