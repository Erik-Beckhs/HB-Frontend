import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocumentsService, ProductsService, QuotationService, SurveyService } from 'src/app/services/service.index';

@Component({
  selector: 'app-answer-gral',
  templateUrl: './answer-gral.component.html',
  styleUrls: ['./answer-gral.component.css']
})
export class AnswerGralComponent implements OnInit {
  idQuot:any;
  nameSurvey!:string;
  suppliers:string[]=[];
  querys:any[]=[];
  answerList : any[]=[];
  preguntasHeader :  string [] =  ['Pregunta'];
  products:any[] = [];
  answerProducts : any[]=[];
  answerDocsList:any[]=[]

  loading:boolean=true;
  loading2:boolean=true;
  loading3:boolean=true;

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _survey:SurveyService,
    private _quotation:QuotationService,
    private _product:ProductsService,
    private _documents:DocumentsService,
    private domSanitizer:DomSanitizer,
    ) { 
    this.idQuot = this._activatedRoute.snapshot.params.id
    
  }

  ngOnInit(): void {
    this.loadAnswersGral();
    this.getSurvey();
    this.suppliersListSurvey();
    this.queryListSurvey();
    this.listProducts();

    this.answerDocs();
  }

  loadAnswersGral(){
    this._survey.AnswersGralByIdQuotation(this.idQuot).subscribe(
      (res:any)=>{
        this.answerList = res;
        //console.log(this.answerList);
      }
    )
  }

  getSurvey(){
    this._survey.getSurveyByIdQuot(this.idQuot).subscribe((res:any)=>{
      this.nameSurvey = res.name
    })
  }

  suppliersListSurvey(){
    this._survey.SuppliersListSurvey(this.idQuot).subscribe((res:any)=>{
      for (let i=0;i<res.length; i++){
        this.suppliers.push(res[i].name)
        if(i+1==res.length){
          this.preguntasHeader = this.preguntasHeader.concat(this.suppliers);
        }
      }
      //console.log(this.suppliers);
    })
  }

  queryListSurvey(){
    let valor:any[]=[];
    this._survey.QuerysByIdQuot(this.idQuot).subscribe((res:any)=>{
      //console.log('Preguntas');
      //console.log(res);
      this.querys = res;
      for(let i = 0; i < this.querys.length; i++){

        this._survey.ListAnswerByIdQuotAndIdQuery(this.idQuot, this.querys[i].id).subscribe((resp:any)=>{
         // console.log('Respuestas');
         //console.log(resp);
          valor.push(this.querys[i].pregunta);
          for(let a of resp){
            valor.push(a.respuesta);
          }
          //console.log(valor);
          this.addRowSurveyTable(valor);
          valor = [];
        })
        
      }
      this.loading = false;
    })
  }

  addRowSurveyTable(array:any){
    let row = document.createElement('TR')
    for(let i in array){
      row.innerHTML += `<td>${array[i]}</td>`;
    }
    let a:any = document.querySelector('#tableSurvey')!.children[1];
    a.appendChild(row);
  }

  listProducts(){
    this._quotation.getProductsAssocQuotation(this.idQuot).subscribe((res:any)=>{
      //console.log('Lista de productos')
      this.products = res;

      if(res.length > 0){
        for(let product of this.products){
          const prod:any = {
            name : product.name
          }
  
           this._product.getAnswersProducts(product.id).subscribe((res:any)=>{
            console.log('Respuesta a productos')
            console.log(res);
            //ans.push(res)
            prod.answers = res
            this.answerProducts.push(prod);
            this.loading2 = false;
          })
          
        }
      }
      else{
        this.loading2 = false;
      }
      
    })
  }

  answerDocs(){
    this._documents.answerDocsByIdQuotation(this.idQuot).subscribe((res:any)=>
    {
      if(res.length > 0){
        this.answerDocsList = res;
        for(let doc of this.answerDocsList){
          if(doc.document){
            doc.document = this.domSanitizer.bypassSecurityTrustUrl(doc.document);
          }
        }
        this.loading3 = false;
      }
      else{
        this.loading3 = false;
      }
    }
    )
  }

}
