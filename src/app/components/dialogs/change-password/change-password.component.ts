import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactInterface } from 'src/app/models/contact.interface';
import { AuthService, ContactsService } from 'src/app/services/service.index';

import swal from 'sweetalert';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  contact:ContactInterface;
  //formContact!:FormGroup;
  // oldPassword:string='';
  // newPassword:string='';

  hide:boolean=true;
  hide2:boolean=true;

  token:any

  constructor(
    private _contact:ContactsService,
    private _auth:AuthService,
    private router:Router,
    private dialogRef: MatDialogRef<any>
    ) { 
    this.token = this._auth.getToken();
    this.contact = _contact.contact;
  }

  ngOnInit(): void {
    // this.formContact = new FormGroup({
    //   password:new FormControl(null, Validators.required),
    //   password2:new FormControl(null, Validators.required)
    // }, 
    //   {validators:this.sonIguales}
    // )
    //console.log('TOKENN!!!');
    //console.log(this._auth.getToken());
    
  }

  // sonIguales: ValidatorFn = (formContacto: AbstractControl): ValidationErrors | null => {
  //   const valor1 = formContacto.get('password');
  //   const valor2= formContacto.get('password2');
  
  //   return valor1!.value === valor2!.value ? null : { sonIguales: true };
  // };

  // sendPassword(){
  //   if(this.formContact.invalid){
  //     swal('Importante', 'Las contraseñas deben ser iguales', 'warning')
  //     return;
  //   }
  //   console.log('guardamos el password nuevo')

  // }

  sendPassword(form:NgForm){
    if(!form.valid){
      return ;
    }
    this._auth.changePassword(form.value, this.token).subscribe((res)=>{
      if(res != ''){
        swal('HANSA Business', 'Su contraseña fue actualizada correctamente, debe volver a iniciar sesión', 'success')
        .then(()=>{
          //cerrar modal
          this._auth.logoutUser();
          this.dialogRef.close();
          this.router.navigate(['login']);
        }
          //
        )
      }
    })
  }
}
