import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactsService } from 'src/app/services/service.index';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  password!:string
  contact:any
  hide:boolean = true

  constructor(
    private _contact:ContactsService,
    private dialog:MatDialog,
    //private dialogRef: MatDialogRef<any>
    ) {
    this.contact = _contact.contact
   }

  ngOnInit(): void {
  }

  confirmPassword(){
    console.log(this.password);
    //TODO: verificamos contraseña y abrimos el otro modal
    //TODO: cerrar el modal y abrir el nuevo
    this.dialog.open(ChangePasswordComponent, {
      width:'30%'
    });
  }
}
