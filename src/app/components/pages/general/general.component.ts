import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { SupplierInterface } from 'src/app/models/supplier.interface';
import { AuthService, ListService } from 'src/app/services/service.index';
import { SuppliersService } from 'src/app/services/service.index';
import { ContactsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  private user!:any;
  private rubros:any;
  private nameRubro:string='No asignado';
  private positionList:any[]=[]

  contact:any

  supplier:any={
    name:"",
    type:"",
    businessArea:"",
    country:"",
    img:"",
    idContact:""
  }

  private idUser!:number

  constructor(
    private authService:AuthService,
    private _supplier:SuppliersService, 
    private dialog:MatDialog,
    private _service:ListService,
    private _contact:ContactsService
    ) {
    this.contact = _contact.contact
    //console.log(this.contact)
    
    //si el contacto tiene registro de proveedor entonces lo cargamos aca
    if(this.contact.suppliers){
      this.supplier=this.contact.suppliers
    }
    this.loadList()
  }

  ngOnInit(): void {

  }

  loadList(){
    //listado de rubros
    this.rubros=this._service.getRubroList()
    //listado de puestos
    this.positionList=this._service.getPositionsList()
  }

  showRubro(idRubro:string){
    for(let rubro of this.rubros){
      if(rubro.id == idRubro){
        this.nameRubro=rubro.name
      }
    }
    return this.nameRubro
  }

  showPosition(value:any){
    let res:string='No encontrado'
    for (let position of this.positionList){
      if(position.code==value){
        res=position.name
      }
    }
    return res
  }
}
