import { Component, OnInit } from '@angular/core';
import { SupplierInterface } from 'src/app/models/supplier.interface';
import { ContactsService, GenerateIDService, ListService, SuppliersService } from 'src/app/services/service.index';

import swal from 'sweetalert'

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  file:any
  contact:any;
  supplier:SupplierInterface={
    name:'',
    country:'',
    type:'',
    businessArea:''
  };

  imageTemp:any;
  imageLoad:boolean=false;
  types:any[]=[];
  businessArea:any[]=[];
  countries:any[]=[];

  constructor(
    private _contact:ContactsService,
    private _list:ListService,
    private _supplier:SuppliersService,
    private _generateID:GenerateIDService
    ) { 
    this.contact=this._contact.contact
    this.loadList();
  }

  ngOnInit(): void {
    this.loadSupplier();
  }

  loadList(){
    this.types=this._list.getTypeList();
    this.businessArea=this._list.getRubroList();
    this.countries=this._list.getPaisList();
  }

  loadSupplier(){
    if(this.contact.suppliers){
      this.supplier=this.contact.suppliers;
      //console.log(this.supplier)
    }
    //console.log(this._contact.contact)
  }

  updateSupplier(supplier:any){
    let idSupplier = this.supplier.id
    this._supplier.updateSupplier(idSupplier, supplier)
    .subscribe(res=>{
      //setear localstorage
      this.contact.suppliers = res;
      this._contact.contact = this.contact;
      this._contact.setContact(this.contact);
    })
  }

  onFileChange(event:any) {
    this.file=event.target.files[0]
    if(!event){
      this.file = null
      return ;
    }

    if(this.file.type.indexOf('image')<0){
      swal("HANSA Business", "Sólo puede elegir archivos de tipo imagen", "error")
      this.file=null
      return ;
    }

    this.imageLoad=this.file

    let reader = new FileReader()
    let urlImagenTemp = reader.readAsDataURL(this.file)
    reader.onloadend = ()=>{
      //console.log(reader.result)
      this.imageTemp = reader.result
    }
  }
  
  //llama al servicio de modificacion de imagen y lo modifica
  updateImage(){
    if(!this.contact.suppliers){
      swal("HANSA Business","Debe registrar la información del proveedor","error");
      return;
    }

    let file:object={
      img:this.imageTemp
    }
    let idSupplier:any = this.supplier.id;
    this._supplier.updateImage(file, idSupplier)
    .subscribe((res:any)=>{
      //setear localstorage
      this.contact.suppliers = res;
      this._contact.contact = this.contact;
      this._contact.setContact(this.contact);
    })
  }

  //Metodo que registra nuevo proveedor
  registerSupplier(supplier:any){
    if(supplier.name.length===0){
      swal("HANSA Business", "El nombre de proveedor es obligatorio", "error");
      return ;
    }
    //TODO: verificar si ya existe el nombre de proveedor
    supplier.id=this._generateID.generateID();
    supplier.idContact=this.contact.id;
    //console.log(supplier)
    this._supplier.registerSupplier(supplier).subscribe();
  }
}
