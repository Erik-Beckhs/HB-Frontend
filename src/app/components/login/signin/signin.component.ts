import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user.interface';
import { AuthService, ContactsService } from 'src/app/services/service.index';
import { FormControl, Validators } from '@angular/forms';
import { ContactInterface } from 'src/app/models/contact.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  remember:boolean=false
  hide:boolean=true
  //email = new FormControl('', [Validators.required, Validators.email]);
  email!:string
  contact!:ContactInterface

  constructor(
    private authService:AuthService,
    private _contact:ContactsService,
    private router:Router
    ) { 

    }

  ngOnInit(): void {
    this.email=localStorage.getItem('email') || ''
    if(this.email.length > 0){
      this.remember=true
    }
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'Debe ingresar un valor';
  //   }
  //   return this.email.hasError('email') ? 'Email no válido' : '';
  // }


  onLogin(formLogin:NgForm){

      if(formLogin.invalid){
        return ;
      }

      let user:UserInterface = {
        email:formLogin.value.email,
        password:formLogin.value.password
      }

      this.authService.login(user, formLogin.value.remember).subscribe(res=>
        {
          let user2:any=res
          let token=user2.id
          this.authService.setToken(token)
          this._contact.getContactByUserId(user2.userId).subscribe(
            res=>{
              //this.contactService.setContact(res)
              let contact2:any=res
              this._contact.getSupplierAssocContact(contact2.id).subscribe(res=>{
                contact2=res
                this._contact.contact=contact2;
                this._contact.setContact(contact2);
                if(contact2.suppliers){
                  this.router.navigateByUrl("/cot-principal")
                }
                else{
                  this.router.navigateByUrl('/cot-principal', { skipLocationChange: true });
                  this.router.navigate(["/pages/business/notRegistered"]);

                }
                //this._contact.setContact(contact2) //guardamos en localStorage
              })
            }
          )
        })
  }
}
