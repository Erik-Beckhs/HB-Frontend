import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-not-registered',
  templateUrl: './not-registered.component.html',
  styleUrls: ['./not-registered.component.css']
})
export class NotRegisteredComponent implements OnInit {
  contact:any

  constructor(
    private _contact:ContactsService,
    private router:Router
    ) { 
    this.contact=_contact.contact
   }

  ngOnInit(): void {
    if(this.contact.suppliers){
      //console.log('Tiene proveedor')
      this.router.navigate(['/pages/business/supplier'])
    }
    else{
      //console.log('No tiene proveedor')
      this.router.navigate(['/pages/business/notRegistered'])
    }
  }

}
