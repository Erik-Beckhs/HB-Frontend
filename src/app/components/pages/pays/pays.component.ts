import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/service.index';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit {
  contactos!:any[]

  constructor(private service:LoginService) { }

  ngOnInit(): void {
    //this.service.getContacts().then(con=>this.contactos=con)
  }
}
