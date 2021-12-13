import { Component, OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AuthService, GenerateIDService } from 'src/app/services/service.index';
import { ContactInterface, SupplierInterface, UserInterface } from '../../../models/interface.index';
import { Router } from '@angular/router';
import { ContactsService, ListService } from 'src/app/services/service.index';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TermsConditionsHansaComponent } from '../../dialogs/terms-conditions-hansa/terms-conditions-hansa.component';

//librerias
import swal from 'sweetalert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formContact!:FormGroup
  contact!:ContactInterface

  hide:boolean=true;
  //hide2:boolean=true
  conditions:boolean=true;
  //email = new FormControl('', [Validators.required, Validators.email]);
  positionsList:any[]=[];

  user!:UserInterface

  paisList:any[]=[]
  rubroList:any[]=[]

  constructor(
    private _list:ListService,
    public dialog:MatDialog,
    private authService:AuthService,
    private router:Router,
    private _contact:ContactsService,
    private _generateID:GenerateIDService
    ) {
      this.paisList=this._list.getPaisList().sort() 
      //this.positionsList=contactsService.getPositions()
      //this.rubroList=_list.getRubroList()
      // this._pais.getPaisList().subscribe(data=>{this.paisList=data, console.log(this.paisList)});
      //this._http.getRequest().subscribe(res=>this.requests=res);
      //this.paisList=data
    //console.log(this.paisList)
  }

  sonIguales: ValidatorFn = (formContacto: AbstractControl): ValidationErrors | null => {
    const valor1 = formContacto.get('password');
    const valor2= formContacto.get('password2');
  
    return valor1!.value === valor2!.value ? null : { sonIguales: true };
  };

  ngOnInit(): void {
    this.formContact = new FormGroup({
      first_name:new FormControl(null, Validators.required),
      last_name:new FormControl(null, Validators.required),
      country:new FormControl(null, Validators.required),
      city:new FormControl(null, Validators.required),
      phone:new FormControl(null, Validators.required),
      email:new FormControl(null, [Validators.required, Validators.email]),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required)
      //conditions:new FormControl(false)
    }, 
      //this.passwordsShouldMatch
      {validators:this.sonIguales}
    )

    this.formContact.setValue({
      first_name:'test1',
      last_name:'test',
      country:'Bolivia',
      city:'La Paz',
      phone:'61216696',
      email:'test1@hansa.com.bo',
      password:'123456',
      password2:'123456'
      //conditions:true
      })
    }
  
  //metodo para registrar a los contactos
  /*onRegister():void{
    this.authService.
    registerContact( 
      this.contact.id=this.generateID(),
      this.contact.first_name!, 
      this.contact.last_name!, 
      this.contact.email!,
      this.contact.phone!,
      this.contact.country!,
      this.contact.city!
      ).subscribe(contact => {
        //console.log(contact)
        this.authService.setUser(contact);
        const token = contact.id;
        this.authService.setToken(token!);
        this.addUser();
        this.router.navigate(['principal']);
        //location.reload();
      })
      //console.log(this.contact)
  }*/

  //registro de usuario
  // onRegister(): void {
  //   //por mientras el username es un id generado
  //   if(this.isChecked==true){
  //     this.user.username=this.generateID()
  //     this.authService
  //     .registerUser(this.user.email!,  this.user.password!)
  //     .subscribe(user => {
  //       this.authService.setUser(user);
  //       const token = user.id;
  //       this.authService.setToken(token!);
  
  //       this.contact.idUser = user.id;
  //       this.contact.email = user.email;
  //       this.contact.id=this.generateID();
  
  //       //console.log(this.contact)
  //       this.authService.registerContact(
  //         this.contact.id!,
  //         this.contact.first_name!,
  //         this.contact.last_name!,
  //         this.contact.email!,
  //         this.contact.phone!,
  //         this.contact.country!,
  //         this.contact.city!,
  //         this.contact.position!,
  //         this.contact.idUser!
  //          ).subscribe(contact => {
  //             this.router.navigate(['/principal/profile']);
  //             //console.log(contact)
  //             /*this.supplier.id=this.generateID();
  //             this.supplier.idContact=contact.id;
  //             this.supplier.country=contact.country;
  //             this.authService.registerSupplier(
  //               this.supplier.id!,
  //               this.supplier.name!,
  //               this.supplier.rubro!,
  //               this.supplier.country!,
  //               this.supplier.idContact!
  //             ).subscribe(supplier=>{
  //               this.router.navigate(['/cot-principal']);
  //             })*/
  //          })
  //     })
  //   }
  //   else{
  //     //alert('Debe aceptar los terminos y condiciones')
  //     swal('Importante', 'Debe aceptar los terminos y condiciones', 'warning')
  //   }
  // }

//metodo para registrar contactos
registerContact(){
  if(this.formContact.invalid){
    swal('Importante', 'Las contraseñas deben ser iguales', 'warning')
    return;
  }

 this.contact = {
   id:this._generateID.generateID(),
   first_name:this.formContact.value.first_name,
   last_name:this.formContact.value.last_name,
   email:this.formContact.value.email,
   phone:this.formContact.value.phone,
   country:this.formContact.value.country,
   city:this.formContact.value.city
 }

  this.user=({
    email:this.formContact.value.email,
    password:this.formContact.value.password
  })

  //registrar usuario, registrar contacto
  this.authService.registerUser(this.user)
  .subscribe(res=>{
      this.user=res;
      this.contact.idUser=this.user.id;
      this._contact.registerContact(this.contact).subscribe(res=>{
      //console.log(res)
      this.contact=res
      const token = this.contact.id;
      this.authService.setToken(token!);
      this._contact.contact=this.contact
      this._contact.setContact(this.contact);
      swal("HANSA Business", "Se creo su usuario de manera exitosa.. Bienvenido a nuestro Portal de Proveedor", "success")
      .then(()=>{
        this.router.navigate(['pages/profile']);
      })
    })
  })
  //this.contactsService.saveContact(this.contact).subscribe(res=>console.log(res))
}

  openDialog() {
    this.dialog.open(TermsConditionsHansaComponent, {
      width:'50%'
    });
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }


  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}

