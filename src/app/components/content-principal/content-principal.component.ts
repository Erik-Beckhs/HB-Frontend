import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare function import_plugins():any

@Component({
  selector: 'app-content-principal',
  templateUrl: './content-principal.component.html',
  styleUrls: ['./content-principal.component.css']
})
export class ContentPrincipalComponent implements OnInit {

  constructor(private title:Title) {
    import_plugins()
    this.title.setTitle('quotations')
   }

  ngOnInit(): void {
    //location.reload()
  }
}
