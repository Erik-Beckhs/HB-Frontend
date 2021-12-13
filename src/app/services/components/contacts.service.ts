import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ContactInterface } from 'src/app/models/contact.interface';
import { URL_SERVICE } from 'src/app/config/config';
import { map } from 'rxjs/operators';

//libreria sweetalert
import swal from 'sweetalert'
import { AuthService } from './auth.service';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contact:any = ''
  notificacion = new EventEmitter<any>()

  constructor(
    private http:HttpClient,
    private _authService:AuthService
    ) { 
    this.getCurrentContact()
  }

  //guarda el contacto en el localstorage
  setContact(contact:any){
      //localStorage.removeItem('contact')
      localStorage.setItem('contact', JSON.stringify(contact))    
  }

  //obtiene el contacto del localstorage
  getCurrentContact(){
    let con:any = localStorage.getItem('contact');
    if(con!=null){
      this.contact = JSON.parse(con)
    }
    return this.contact;
  }

  //obtiene el contacto a partir del id de usuario
  getContactByUserId(userId:any){
    const url = `${URL_SERVICE}/api/contacts/findOne?filter[where][idUser]=${userId}`;
    return this.http.get(url);
   // http://localhost:3000/api/contacts/findOne?filter=%7B%22where%22%20%3A%20%7B%22idUser
  }

  //registra nuevo contacto
  registerContact(contact:ContactInterface){
    const url=`${URL_SERVICE}/api/contacts`;
    return this.http.post(url, contact)
  }

  //obtiene el proveedor asociado al contacto a partir del id de contacto
  getSupplierAssocContact(idContact:any){
    let url=`${URL_SERVICE}/api/contacts?filter={"where": {"and": [{"id": "${idContact}"}]}, "include":"suppliers"}`
    return this.http.get(url).pipe(map((res:any)=>
        res[0]
      ))
  }

  //actualiza contacto en la bd, en el local storage y devuelve mensaje sweet alert
  updateContact(idContact:string, contact:ContactInterface){
    let url=`${URL_SERVICE}/api/contacts/${idContact}`
    return this.http.patch(url, contact).pipe(map((res:any)=>{
      this.getSupplierAssocContact(res.id).subscribe(res=>{
        let newContact=res
        //this.setLocalStorage(newContact.email, newContact)
        this.setContact(newContact)
        let user = {
          email : newContact.email
        }
        this._authService.updateUser(this.contact.idUser, user).subscribe()
        //preguntamos si email esta en localstorage y lo cambiamos
        let emailStg=localStorage.getItem('email')
        if(emailStg != null){
          this._authService.setEmail(newContact.email)
        }
      })
      swal('HANSA Business', "Se actualizó su información de manera exitosa", 'success')
      // .then(()=>{
      //   location.reload()
      // })
    }))
  }

  //metodo para modificar imagen
  updateImage(file:object, id:string){ 
    let url=`${URL_SERVICE}/api/contacts/${id}`
    return this.http.patch(url, file).pipe(map((res:any)=>{
      this.getSupplierAssocContact(res.id).subscribe(res=>{
        this.contact=res
        this.setContact(this.contact)
      })
      swal('HANSA Business', "Se actualizó su imagen de manera exitosa", "success")
      // .then(res=>{
      //   location.reload()
      // })
      //location.reload()//buscar un mejor lugar
    }))
  }
}
