import { Component, OnInit, ViewChild  } from '@angular/core';
import { ProductInterface } from 'src/app/models/product.interface';
import { AuctionService, ContactsService, ProductsService, QuotationService } from 'src/app/services/service.index';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../../dialogs/product/product.component';
import { Router } from '@angular/router';
import { OnExit } from '../../../guards/exit-quotation.guard';

import swal from 'sweetalert';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnExit {
  products:ProductInterface[]=[];
  displayedColumns: string[] = ['name', 'amount', 'unitPriceOffer', 'discount', 'subTotalOffer', 'edit'];
  dataSource:any;
  idQuot:string='';
  idAnswer:any = 10;
  idSupplier:string='';
  loading:boolean = true;

  color:any

  selValue:string='ptje';

  select:any[]=[
    {value:'ptje', name:'%'},
    {value:'moneda', name:'$'}
  ]

  total:number = 0;
  money:any = 'USD'

  exit:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private _product:ProductsService,
    private _quotation:QuotationService,
    public dialog:MatDialog,
    private router:Router,
    private _contact:ContactsService,
    private _auction:AuctionService
  ) { 
    this.idQuot = this._quotation.idQuot;
    this.idSupplier = this._contact.contact.suppliers.id
    this.getAnswer();
    this._quotation.getQuotationById(this.idQuot)
    .subscribe((res:any)=>this.money = res.money)
  }

  ngOnInit(): void {
    this.loading = true;

    this.loadProducts()

    this._product.notificacion.subscribe(res=>
      {
        this.loadProducts();
      }
    )

    this.color = {
      a:this.generarNumero(),
      b:this.generarNumero(),
      c:this.generarNumero(),
    }
  }

  onExit(){
    if(this.exit){
      return true;
    }
    else{
      const msg = confirm ("¿Esta seguro que desea dejar la subasta? Sus valores ingresados permanecerán");
      return msg;
    }
  }

  getAnswer(){
    this._quotation.getAnswerByIdQuotAndIdSupplier(this.idQuot, this.idSupplier)
      .subscribe((res:any)=>
      {
        this.idAnswer=res.id;
      }
    )
  }

  // changeValue(element:any){
  //   //console.log(element);
  //   //console.log(input.value);

  //   let value = element
  //   //console.log(value)
  //   //const newValue = input.value;

  //   // if(newValue >= value){
  //   //   element.unitPriceOffer = 0
  //   // }
  // }

  loadProducts(){
    this._quotation.getProductsAssocQuotation(this.idQuot)
    .subscribe((res:any)=>{
      this.products=res;

      for(let i=0; i < this.products.length; i++){

        this._product.countAnswerProdServByIdAnswerAndIdProdServ(this.idAnswer, this.products[i].id)
        .subscribe((res:any)=>{
          //console.log('EXISTE O NO')
          if(res.count === 0){
            this.products[i].unitPriceOffer = 0;
            this.products[i].subTotalOffer = 0;
            this.products[i].about = '';
            this.products[i].offerName = '';
            this.products[i].link = '';
            this.products[i].timeService = 0;
            this.products[i].advantage = '';
            this.products[i].nameDoc = '';
            this.products[i].doc = '';
            this.products[i].img = '';
            this.products[i].discount = 0;
            this.products[i].typeDiscount = 'ptje';
            this.products[i].priceDiscount = 0 ;
          }
          else{
            //TODO: encontrar el registro y asignarlo a esos dos campos
            this._product.getAnswerProdServByIdAnswerAndIdProdServ(this.idAnswer, this.products[i].id)
            .subscribe((res:any)=>{
              this.products[i].idAnswerProd = res.id;
              this.products[i].unitPriceOffer = res.unitPrice;
              this.products[i].subTotalOffer = res.total;
              this.products[i].about= res.about;
              this.products[i].offerName = res.offerName;
              this.products[i].link = res.link;
              this.products[i].timeService = res.timeService;
              this.products[i].advantage = res.advantage;
              this.products[i].nameDoc = res.nameDoc;
              this.products[i].doc = res.doc;
              this.products[i].img = res.img;
              this.products[i].discount = res.discount;
              this.products[i].typeDiscount = res.typeDiscount;
              this.products[i].priceDiscount = res.priceDiscount;

              this.total += res.priceDiscount * this.products[i].amount!;            
            })
          }
        })
      }
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }

  responseProduct(value:any){
    value.idAnswer = this.idAnswer;

    if(value.unitPriceOffer > 0){
      this.dialog.open(ProductComponent, {
        width:'60%',
        data: value
      });
    }
    else{
      swal("HANSA Business", "Valor de precio no aceptado", "error");
    }
    // return;
  }

  volver(){
    this.router.navigate(['/cot-principal']);
  }

  changePrice(element:any){
    this.verifyPrice(element)
    element.unitPriceOffer = element.priceDiscount
    element.discount = 0
    element.typeDiscount = 'ptje'

    this.sumTotal()
  }

  changeDiscount(element:any){
    this.verifyDiscount(element);
    if(element.priceDiscount == 0){
      return ;
    }

    if(element.typeDiscount == 'ptje'){
      element.priceDiscount = element.unitPriceOffer - (element.unitPriceOffer * (element.discount/100));
    }
    else if(element.typeDiscount == 'moneda'){
      element.priceDiscount = element.unitPriceOffer - element.discount;
    }

    this.sumTotal()
  }

  sumTotal(){
    this.total = 0

    for (let product of this.products){
      this.total += product.amount! * product.priceDiscount!
      //console.log(product.priceDiscount)
      //console.log(product)
    }
  }

  verifyPrice(element:any){
    if(element.unitPriceOffer < 0 ||  typeof (element.unitPriceOffer) != 'number'){
      element.unitPriceOffer = 0;
    }
  }

  verifyDiscount(element:any){
    if(element.discount < 0 || typeof (element.discount) != 'number'){
      element.discount = 0;
    }
    if(element.typeDiscount == 'ptje'){
      if(element.discount > 100){
        element.discount = 0
      }
    }
    else{
      if(element.discount > element.priceDiscount){
        element.discount = 0;
      }
    }
  }

  bid(){
    this.saveProduct()

    const date = new Date();

    let bid = {
      idAnswer : this.idAnswer,
      total : this.total,
      datetime : date
    }

    this._auction.setBid(bid)
    .subscribe(()=>{
      console.log('Se envió la puja');
    })
  }

  saveProduct(){
    for(let prod of this.products){
      if(prod.idAnswerProd){
        let answerProd:any = {
        id : prod.idAnswerProd,
        unitPrice : prod.unitPriceOffer,
        priceDiscount : prod.priceDiscount,
        typeDiscount :prod.typeDiscount,
        total : prod.priceDiscount! * prod.amount!,
      };

        //actualizar
        this._product.updateAnswerProds(answerProd.id, answerProd)
        .subscribe(res=>{
          console.log('Producto actualizado')
        })
      }
      else{
        //guardar nuevo
        let answerProd:any = {
          idAnswer : this.idAnswer,
          idProdServ : prod.id,
          unitPrice : prod.unitPriceOffer,
          priceDiscount : prod.priceDiscount,
          typeDiscount :prod.typeDiscount,
          total : prod.priceDiscount! * prod.amount!,
        };
  
          //crear
          this._product.createAnswerProd(answerProd)
          .subscribe((res:any)=>{
            this._product.notificacion.emit(res);
            //console.log('Se creo la respuesta de producto');
          })
      }
    }
    console.log(this.products)
  }
  // saveProduct(value:any){
  //   // console.log(this.data)
  //   if(this.data.idAnswerProd){
  //     //actualizar
  //     let answerProd:any = {
  //       id : this.data.idAnswerProd,
  //       unitPrice : this.data.unitPriceOffer,
  //       total : this.data.unitPriceOffer * this.data.amount,
  //       offerName : value.offerName,
  //       about : value.about,
  //       timeService : value.timeService,
  //       link : value.link,
  //       advantage : value.advantage
  //     };
  //     if(this.imageLoad){
  //       ///answerProd.img = this.imageTemp
  //       answerProd.img = this.imageTemp
  //     }
  //     if(this.documentLoad){
  //       answerProd.nameDoc = this.document.name,
  //       answerProd.doc = this.data.docb64
  //     }
  //     if(this.data.priceDiscount){
  //       answerProd.discount = this.data.discount,
  //       answerProd.typeDiscount = this.data.typeDiscount,
  //       answerProd.priceDiscount = this.data.priceDiscount,
  //       answerProd.total = this.data.priceDiscount * this.data.amount
  //     }
  
  //     this._product.updateAnswerProds(answerProd.id, answerProd)
  //     .subscribe((res:any)=>
  //     swal("HANSA Business", "Se actualizó su respuesta para el producto " + res.offerName, "success")
  //     .then(()=> {
  //     this._product.notificacion.emit(res);
  //     this.dialogRef.close();
  //     }
  //     )
  //     )
  //   }
  //   else{
  //     //crear
  //     let answerProd:any = {
  //       idAnswer : this.data.idAnswer,
  //       idProdServ : this.data.id,
  //       unitPrice : this.data.unitPriceOffer,
  //       total : this.data.unitPriceOffer * this.data.amount,
  //       offerName : value.offerName,
  //       about : value.about,
  //       timeService : value.timeService,
  //       link : value.link,
  //       advantage : value.advantage
  //     };
  //     if(this.imageLoad){
  //       ///answerProd.img = this.imageTemp
  //       answerProd.img = this.imageTemp
  //     }
  //     if(this.documentLoad){
  //       answerProd.nameDoc = this.document.name,
  //       answerProd.doc = this.data.docb64
  //     }

  //     if(this.data.priceDiscount){
  //       answerProd.discount = this.data.discount,
  //       answerProd.typeDiscount = this.data.typeDiscount,
  //       answerProd.priceDiscount = this.data.priceDiscount
  //     }
  
  //     this._product.createAnswerProd(answerProd)
  //     .subscribe((res:any)=>
  //     swal("HANSA Business", "Se registró su respuesta para el producto " + res.offerName, "success")
  //     .then(()=> {
  //     this._product.notificacion.emit(res);
  //     this.dialogRef.close();
  //     }
  //     )
  //     )
  //   }
  //   //return;
  // }

  //funciones para generar color RGB ======
  generarNumero(){
    return (Math.random()*255).toFixed(0);
  }
  
//  colorRGB(){
//     var color = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
//     return "rgba" + color;
//   }
  //=======================================
}
