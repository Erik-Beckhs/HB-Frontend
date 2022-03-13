import { Component, OnInit, ViewChild  } from '@angular/core';
import { ProductInterface } from 'src/app/models/product.interface';
import { AnswerSendService, AuctionService, ContactsService, DocumentsService, ProductsService, QuotationService, SurveyService } from 'src/app/services/service.index';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductComponent } from '../../dialogs/product/product.component';
import { Router } from '@angular/router';
import { OnExit } from '../../../guards/exit-quotation.guard';
import {MatDialog} from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

import swal from 'sweetalert';
import { AuctionRulesComponent } from '../../dialogs/auction-rules/auction-rules.component';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentInterface } from 'src/app/models/document.interface';

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

  documents:DocumentInterface[]=[];

  countAnswerProds:number = 0;
  cantAnswers:number = 0

  quotation!:QuotationInterface

  color:any;
  rules:any = {
    timeBeforeNewBid:0
  };

  timeZero:boolean = true;

  selValue:string='ptje';

  select:any[]=[
    {value:'ptje', name:'%'},
    {value:'moneda', name:'$'}
  ]

  validity:number = 0;

  total:number = 0;
  money:any = 'USD'

  exit:boolean = false;

  aucRules = 1;

  //variables para temporizador
  end:any;
  timeBid:any = 'Oferta no existente';
  difference!:number;

  //variables para calculo de puja
  oldTotal!:number;
  newTotal!:number;

  public surveyGral:any = {
    name : ''
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private _product:ProductsService,
    private _quotation:QuotationService,
    public dialog:MatDialog,
    private router:Router,
    private _contact:ContactsService,
    private _auction:AuctionService,
    private _answerSend:AnswerSendService,
    private _survey:SurveyService,
    private _formBuilder: FormBuilder,
    private _document:DocumentsService,
    private domSanitizer:DomSanitizer
  ) { 
    this.idQuot = this._quotation.idQuot;
    this.idSupplier = this._contact.contact.suppliers.id
    this.getAnswer();
    this._quotation.getQuotationById(this.idQuot)
    .subscribe((res:any)=>{
      this.money = res.money;
    })
    //obtenemos las reglas de mejora
    this._quotation.getRulesByIdQuotation(this.idQuot).subscribe(
      res=> {
        this.rules = res;

        this._quotation.getQuotationById(this.idQuot).subscribe(res=>{
          {
            this.quotation = res;
            this.openDialogRules();
          }
        })
        //this.temporizador(this.rules.timeBeforeNewBid);
        //console.log("reglas de mejora");
        //console.log(this.rules);
    }
    )
  }

  ngOnInit(): void {

    this.loading = true;

    this.loadProducts()

    this._product.notificacion.subscribe(res=>
      {
        this.loadProducts();
      }
    )

    this.loadDocuments();

    this.getSurveyGral(this.idQuot);

    this.color = {
      a:this.generarNumero(),
      b:this.generarNumero(),
      c:this.generarNumero(),
    }
  }


  openDialogRules(){
    let rulesSend:any = this.rules;
    rulesSend.name = this.quotation.name;
    rulesSend.money = this.quotation.money;

    if(this.aucRules == 1){
      this.dialog.open(AuctionRulesComponent, {
        width :'50%',
        disableClose : true,
        data : rulesSend
      });
    }
  }

  onExit(){
    let val = false;
    if(this.exit){
      return true;
    }
    else{
      let v = swal({
        title: "HANSA Business",
        text: "Esta seguro de dejar la subasta? No podrá participar más en la misma",
        icon: "warning",
        buttons: ['Cancelar', 'Estoy seguro'],
        dangerMode: true,
      })
      .then((value) => {
        if (value) {

          let v2 =  swal({
            title: "HANSA Business",
            text: "Abandonar Subasta",
            icon: "warning",
            buttons: ['Salir sin guardar', 'Guardar y Salir'],
            dangerMode: true,
          })
          .then((value) => {
            if (value) {
              //TODO: verificar si respondio a pregs, form de pregs y docs
              if(this.validateTotal() && this.validateForm() && this.validateDocs()){
                  //guardar su data
                  console.log('guarda su data');
                  const answer = {
                    id: this.idAnswer,
                    state : 2 //ver a que estado corresponde
                  }
                  this._quotation.updateAnswer(answer).subscribe(()=>console.log('Se cambió el estado'))
                  return true;
              }
              else{
                //let st:boolean;
                let st = swal({
                  title: "HANSA Business",
                  text: "Información incompleta, para participar en nuestra subasta debe enviar al menos una puja y responder a las preguntas del formulario y documentos solicitados",
                  icon: "error",
                  buttons: ['Salir sin guardar', 'Volver'],
                  dangerMode: true,
                }).then((valor)=>{
                  if(valor){
                    console.log('solo cierra el modal')
                    return false;
                  }
                  else{
                    this.deleteAnswerProds();
                    const answer = {
                      id: this.idAnswer,
                      state : 9
                    }
                    this._quotation.updateAnswer(answer).subscribe(()=>console.log('Se cambió el estado'))
                    return true;
                  }
                });
                return st;
              }
            } 
            else {
              //eliminar respuestas
              this.deleteAnswerProds();
              const answer = {
                id: this.idAnswer,
                state : 9
              }
              this._quotation.updateAnswer(answer).subscribe(()=>console.log('Se cambió el estado'))
              return true;
            }
          });
          return v2;
        } 
        else {
          return false
        }
      });
      return v;
    }
  }

  //validamos respuestas
  validateTotal(){
    if(this.total != 0){
      return 1;
    }
    else{
      return 0;
    }
  }

  validateForm(){
    //las preguntas deben haber sido respondidas
    return 0;
  }

  validateDocs(){
    //los documentos obligatorios deben haber sido subidos
    return 0;
  }

  deleteAnswerProds(){
    this._quotation.countAnswersProdByIdAnswer(this.idAnswer).subscribe((res:any)=>
        {
          this.countAnswerProds = res.count

          if(this.countAnswerProds > 0){
            
            //eliminar 
            this.deleteBid();
            this.deleteAnswerProdsByAnswer();
          }
        }
      )
  }

  deleteAnswerProdsByAnswer(){
    this._quotation.deleteAnswersProdByIdAnswer(this.idAnswer).subscribe(()=>
      {
        console.log('Se eliminaron los registros de respuestas de productos')
      }
      )
  }

  deleteBid(){
    this._quotation.deleteBidByIdAnswer(this.idAnswer)
    .subscribe(()=>
              console.log('Se eliminaron las pujas')
        )
  }

  getAnswer(){
    this._quotation.getAnswerByIdQuotAndIdSupplier(this.idQuot, this.idSupplier)
      .subscribe((res:any)=>
      {
        this.idAnswer=res.id;

        if(res.state == 2){
          //this.dialog.open(AuctionRulesComponent).close()

          this._answerSend.openModal();
          this.aucRules = 0;
          //debugger;

          //this._answerSend.state = 0;
          this.exit = true;
        }
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
    this.total = 0;
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
              this.oldTotal = this.total;           
            })
          }
        })
      }
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }

  loadDocuments(){
    this._document.getDocumentsAssocQuotation(this.idQuot).subscribe((documents:any)=>{
      this.documents=documents;
    
      for(let i=0;i<this.documents.length;i++){
        let idDoc = this.documents[i].id
        this._document.countAnswerDocsByIdAnswerAndIdDoc(this.idAnswer, idDoc)
        .subscribe((res:any)=>{

          if(res.count === 0){
            this.documents[i].idAnswer = this.idAnswer
            this.documents[i].nameDoc = ''
            this.documents[i].document = ''
            if(this.documents[i].template){
              this.documents[i].templateSanitized = this.domSanitizer.bypassSecurityTrustUrl(this.documents[i].template!)
            }
          }
          else{
            this._document.getAnswerDocumentByIdAnswerAndIdDocument(this.idAnswer, this.documents[i].id)
            .subscribe((resp:any)=>{
              this.documents[i].idAnswer = resp.idAnswer
              this.documents[i].nameDoc = resp.nameDoc
              this.documents[i].document = resp.document
              this.documents[i].idAnswerDoc = resp.id
              if(this.documents[i].template){
                this.documents[i].templateSanitized = this.domSanitizer.bypassSecurityTrustUrl(this.documents[i].template!)
              }
            })
          }
        })
      }
      //console.log(this.documents)
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
    this.verifyPrice(element);
    element.unitPriceOffer = element.priceDiscount;
    element.discount = 0;
    element.typeDiscount = 'ptje';
    this.sumTotal();
  }

  onDocChange(event:any, document:any)
  {

    let file = event.target.files[0]
    //console.log(file)
    if(!event){
      file = null
      return ;
    }

    if(file.name.split('.')[1] === 'xlsx' || file.name.split('.')[1] === 'docx' || file.name.split('.')[1] === 'pdf' || file.name.split('.')[1] === 'csv' || file.name.split('.')[1] === 'txt' || file.name.split('.')[1] === 'ppt' || file.name.split('.')[1] === 'JPG' || file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'PNG' || file.name.split('.')[1] === 'txt'){
      //this.documentLoad=file
      //this.nameDocument=file.name

      let reader = new FileReader()
      let urlImagenTemp = reader.readAsDataURL(file)
      reader.onloadend = ()=>{
        document.nameDoc = file.name
        document.document = reader.result
      }
    }
    else{
      swal("HANSA Business", "Tipo de archivo no permitido", "error")
      file=null
      return ;
    }
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

  validDocuments(){
    let cont:number=0;
    // console.log(this.documents);
    // return;
    for(let document of this.documents){
      if(document.required == true && (document.document == '' || document.document == null)){
        cont += 1;
      }
    }
    return cont;
  }

    //metodo para guardar los documentos requeridos en la cotizacion
    saveDocsRequired(){
      for(let doc of this.documents){
        if(doc.idAnswerDoc){
          let newDoc:any = {
            nameDoc:doc.nameDoc,
            document:doc.document
          }
          //actualizar
          this._document.updateAnswerDocument(doc.idAnswerDoc, newDoc)
          .subscribe(()=>console.log('Se actualizó con exito'))
        }
        else{
          let newDoc:any = {
            idAnswer:doc.idAnswer,
            idDoc:doc.id,
            nameDoc:doc.nameDoc,
            document:doc.document
          }
          //crear nuevo
          this._document.saveAnswerDocument(newDoc).subscribe(()=>console.log('Se creó el registro de manera exitosa'))
        }
      }
    }

  validateBid(){
    this.newTotal = this.total;
    // console.log('viejo total', this.oldTotal);
    // console.log('nuevo total', this.newTotal);
    // return;
    let value:number=0;

    if(this.rules.drawTotal == false){
      if(this.rules.typeImproveTotal == '%'){
        console.log('regla de mejora porcentaje')
      }
      else if(this.rules.typeImproveTotal == 'monto'){
        value = this.oldTotal - this.rules.valueImproveTotal;
      }
      if(this.newTotal > value){
        alert("Debe bajar el precio total");
        this.loadProducts();
        return;
      }
      else{
        this.bid();
      }
    }
    return;
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
      this.temporizador(this.rules.timeBeforeNewBid);
      //console.log('Se envió la puja');
      swal("HANSA Business", "Se actualizo su oferta", "info");
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

  temporizador(time:any){
    this.timeZero = true;

    let fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() + time);

    let x = setInterval(() => {
      let now = new Date().getTime();
      //this.start = new Date('dec 03, 2021 11:55:00');
      this.difference = fecha.getTime() - now;
      // let days = Math.floor(this.difference/(1000*60*60*24));
      // let hours = Math.floor((this.difference % (1000*60*60*24)) / (1000*60*60));
      let mins = Math.floor((this.difference % (1000*60*60)) / (1000*60));
      let seconds = Math.floor((this.difference % (1000*60)) / (1000));
      this.timeBid = `${mins}m ${seconds}s`;
      if(this.difference < 0){
        clearInterval(x);
        this.timeBid = 'Puede enviar su puja ahora';
        this.timeZero = false;
        //this.router.navigate(['/cot-principal/content-side/', this.idQuot, 'auction']);
      }
    });
  }

  formResponse(){
    for(let section of this.surveyGral.sections){
      for(let query of section.querys){
        if(query.type != 5){
          if(query.idAnswerSurvey){
            //actualizar
            //console.log('actualizar')
            let answerSurvey = {
              id : query.idAnswerSurvey,
              answer1 : query.answer
            }
            //console.log(answerSurvey)
            this._survey.updateAnswerSurvey(answerSurvey).subscribe(()=>{
              //swal("HANSA Business", "Se actualizaron sus respuestas", "success")
              console.log('Formulario de preguntas guardado con exito')
            })
          }
          else{
            //crear
            //console.log('crear')
            let answerSurvey = {
              idAnswer : this.idAnswer,
              idQuery : query.id,
              answer1 : query.answer
            }
            //console.log(answerSurvey)
            this._survey.createAnswerSurvey(answerSurvey).subscribe(()=>{
              //swal("HANSA Business", "Se registró sus respuestas", "success")
              console.log('Se registró sus respuestas')
            })
          }
        }
        else{
          for(let option of query.options){
            //console.log(option)
            if(option.idAnswerSurvey){
              
              // this._survey.updateAnswerSurvey()
              if(option.check == false){
                //eliminamos los que han sido desmarcados
                this._survey.deleteAnswerSurvey(option.idAnswerSurvey).subscribe()
              }
              else{
                //actualizar
              let newOption = {
                id : option.idAnswerSurvey,
                answer1 : option.name,
              }
                this._survey.updateAnswerSurvey(newOption).subscribe()
              }
            }
            else{
              let newOption = {
                idAnswer : this.idAnswer,
                answer1 : option.name,
                idQuery : option.idQuery
              }
              //crear
              this._survey.createAnswerSurvey(newOption).subscribe()
            }
          }
          //por cada opcion guardar
        }
      }
    }
  }

  getSurveyGral(idQuot:any){
    this._quotation.getQuotationById(idQuot).subscribe(res=>{
      this.quotation=res
      this._survey.getSurveyAndSectionByIdSurvey(this.quotation.idSurvey).pipe(map(
        (res:any)=>res=res[0]
      )).subscribe((res:any)=>{
        this.surveyGral=res;
        let section:any = res.sections;
        for (let i=0;i<section.length;i++){
          let querys:any[]=[];
          this._survey.getQueriesByIdSection(section[i].id)
          .subscribe((res:any)=>{
            for(let j = 0; j < res.length ; j++){
              this._survey.getQueriesAndOptionsByIdQuery(res[j].id)
              .subscribe((resp:any)=>{
              
              //TODO: agregar su respuesta si existe
              this._survey.countAnswerSurveyByIdAnswerAndIdQuery(this.idAnswer, resp.id)
              .subscribe((res:any)=>
                  {
                    if(res.count > 0){
                      if(resp.type != 5){
                        this._survey.getAnswerSurveyByIdAnswerAndIdQueryFindOne(this.idAnswer, resp.id)
                        .subscribe((res:any)=>{
                            resp.answer = res.answer1
                            resp.idAnswerSurvey = res.id
                        })
                      }
                      else{
                        //es de tipo 5 cargar campo check a los options
                        //devolver el listado de answer survey dado idquery e idanswer
                        this._survey.getAnswerSurveyByIdAnswerAndIdQuery(this.idAnswer, resp.id)
                        .subscribe((res:any)=>{
                            resp.answer = res.answer1
                            resp.idAnswerSurvey = res.id
                            for (let option of resp.options){
                                for(let answerSurvey of res){
                                  if(option.name === answerSurvey.answer1){ //solo esta comparando con el primer valor
                                    option.check = true
                                    option.idAnswerSurvey = answerSurvey.id
                                  }
                                  // else{
                                  //   option.check = false
                                  // }
                                }
                            }
                        })
                        //hacer un for para options de query
                        //comparar si options.name == answerSurvey.answer1
                        //agregar campo check al option con true
                      }
                    }
                    else{
                      resp.answer = '';
                    }
                  }
                )
                //TODO: si es de tipo desplegable, entrar a answer survey y con idquery e idanswer
                //devolver un array de respuestas, answerSurvey.answer1 === options.name 

              querys.push(resp);
              //console.log('LISTA DE PREGUNTAS')
              //console.log(resp)
              this._survey.countAnswerSurveyByIdAnswer(this.idAnswer)
              .subscribe((res:any)=>this.cantAnswers=res.count)

              if(j+1 == res.length){
                //querys.sort((a, b) => a.orderQuery - b.orderQuery);
                  this.surveyGral.sections[i].querys =  querys.sort((a, b) => a.orderQuery - b.orderQuery);
              }
            })  
            }
          })

          //TODO: asignar las respuestas de options
        }
        console.log('***FORMULARIO DE PREGUNTAS***');
        console.log(this.surveyGral);
      })
    })
  }
  
//  colorRGB(){
//     var color = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
//     return "rgba" + color;
//   }
  //=======================================
}
