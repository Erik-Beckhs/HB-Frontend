import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ContactsService } from 'src/app/services/service.index';
//import { MatDialog } from '@angular/material/dialog';
//import { LogoutUserComponent } from '../../dialogs/logout-user/logout-user.component';
import { ContactInterface, UserInterface } from 'src/app/models/interface.index';

//libreria sweetalert
import swal from 'sweetalert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  estado:boolean=false;
  user:UserInterface={
    username:'',
    email:''
  }

  contact:any={
    img:''
  }

  constructor(
    private authService:AuthService,
    private _contact:ContactsService,
    private router:Router, 
    ) {
     
   }

  ngOnInit(): void {
    this.loadContact()

    this._contact.notificacion.subscribe(res =>
      this.loadContact()
    )

  }

  loadContact(){
    //this.contact=this._contact.contact
    this.contact = this._contact.getCurrentContact();
  }

  logOut() {
    //this.dialog.open(LogoutUserComponent);
    swal({
      title:'HANSA Business',
      text:'¿Desea cerrar sesión y abandonar el sistema?',
      icon:'info',
      buttons:['Si','No'],
      dangerMode:true,
    }).then((res)=>{
      if(!res){
        //console.log('SI')
        //this.router.navigate([`cot-principal/content-info/${this.idQuot}/responder`])
        this.authService.logoutUser()
        location.reload()
      }
      else{
        //this.router.navigate(['cot-principal'])
        //console.log('Mas tarde')
      }
    })
  }

  showQuotations(){
    if(!this.contact.suppliers){
      swal("Importante","Aún no puede participar en nuestras cotizaciones debido a que no tiene asignado un proveedor", "warning")
    }
    else{
      this.router.navigate(['/cot-principal'])
    }
  }
}

