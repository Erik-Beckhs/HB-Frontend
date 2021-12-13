import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/services/service.index';


import swal from 'sweetalert';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  contact:any;
  formContact!:FormGroup;
  hide:boolean=true;
  hide2:boolean=true;

  constructor(private _contact:ContactsService) { 
    this.contact = _contact.contact;
  }

  ngOnInit(): void {
    this.formContact = new FormGroup({
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required)
    }, 
      {validators:this.sonIguales}
    )
  }

  sonIguales: ValidatorFn = (formContacto: AbstractControl): ValidationErrors | null => {
    const valor1 = formContacto.get('password');
    const valor2= formContacto.get('password2');
  
    return valor1!.value === valor2!.value ? null : { sonIguales: true };
  };

  sendPassword(){
    if(this.formContact.invalid){
      swal('Importante', 'Las contraseñas deben ser iguales', 'warning')
      return;
    }
    console.log('guardamos el password nuevo')
    //this.formContact.value.password;
  }
}
