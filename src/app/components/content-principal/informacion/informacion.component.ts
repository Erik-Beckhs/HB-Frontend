import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationInterface } from 'src/app/models/quotation.interface';
import { TermsConditionsService } from 'src/app/services/others/terms-conditions.service';
import { ContactsService, QuotationService } from 'src/app/services/service.index';
import { TermsConditionsInterface } from 'src/app/models/termsConditions.interface';

//sanitizador
import { DomSanitizer } from '@angular/platform-browser';

//sweetalert
import swal from 'sweetalert';


@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})

export class InformacionComponent implements OnInit {
  intencion:boolean=true;
  idQuot!:any;
  quotation:QuotationInterface = {
    name:''
  };
  termsConditions:TermsConditionsInterface[]=[];
  term!:TermsConditionsInterface;

  answer:any;
  answerTerms:AnswerTerms[]=[];

  constructor(
    private _terms:TermsConditionsService,
    private route:ActivatedRoute,
    private _quotation:QuotationService,
    private router:Router,
    private domSanitizer:DomSanitizer,
    private _contact:ContactsService
    ) { 
    //obtenemos el parametro id de la ruta
    //this.getParameterIdQuot();
    this.idQuot = this._quotation.idQuot
  }
    
  ngOnInit(): void {
    this.getAnswer()

    this.getConditions(this.idQuot)
  }

  //obtenemos el parametro id de la ruta
  // getParameterIdQuot(){
  //   this.route.paramMap.subscribe(params=>{
  //     if(params.has("id")){
  //       this.idQuot=params.get("id")
  //       //seteamos el id de cotizacion
  //       this._quotation.idQuot=this.idQuot
  //       this._quotation.setIdQuot(this.idQuot)
  //     }
  //     else{
  //       console.log("No existe el parametro id")
  //     }
  //   })
  // }

  getConditions(iq:any){
      this._terms.getTermsAndConditionsByIdQuotation(iq).subscribe(
      (res:any)=>{
        this.termsConditions = res;
        for(let i=0; i<res.length;i++){
          //SANITIZAR EL DOCUMENTO
          if(this.termsConditions[i].document){
              this.termsConditions[i].documentSanitized=this.domSanitizer.bypassSecurityTrustUrl(this.termsConditions[i].document);
              this.termsConditions[i].doc=this.dataURLtoFile(this.termsConditions[i].document, this.termsConditions[i].name);
          }
         this._terms.getAnswerTermsByIdAnswerAndIdTerm(this.answer.id, this.termsConditions[i].id)
         .subscribe((resp:any)=>
         {
           if(resp.id){
              this.termsConditions[i].idAnswerTerm = resp.id
              this.termsConditions[i].checkSupplier = resp.checkSupplier
              this.termsConditions[i].commentSupplier = resp.commentSupplier
            //console.log('tiene registro')
           }
           else{
            this.termsConditions[i].checkSupplier = false
            this.termsConditions[i].commentSupplier = ''
            //console.log('no tiene registro')
           }
         }
         )
        }
        console.log(this.termsConditions)
      })
  }

  //metodo que devuelve la cotizacion desde el servicio cotizacion
  getQuotation(iq:any)
  {
    this._quotation.getQuotationById(iq).subscribe(res=>{
      this.quotation = res
    })
  }

  //obtiene el id de answer y los terminos y condiciones
  getAnswer(){
    this._quotation.getAnswerByIdQuotAndIdSupplier(this.idQuot, this._contact.contact.suppliers.id)
    .subscribe(res=>{
      this.answer=res;
      console.log(this.answer.id)
      
    })
  }

  //convierte codigo base 64 en archivo
  dataURLtoFile(dataurl:any, filename:string) {
    let arr:any = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }

  //metodo que envia la informacion al solicitante (cotizacion aceptada o rechazada y motivos)
  sendFormInformation(form:any){

    let c:number=0;
    for(let terms of this.termsConditions){
      if(!terms.checkSupplier){
        c+=1;
      }
    }

    if(c>0){
      //console.log('Rechazado');
      swal({
        title:'HANSA Business',
        text:'Su participación en la cotización será registrada como rechazada.... ¿Está seguro de continuar?',
        icon:'info',
        buttons:['Estoy seguro','Cancelar'],
        dangerMode:true,
      }).then((res)=>{
        if(!res){

          for(let term of this.termsConditions){
            if(term.idAnswerTerm){
              //actualizar
              this.updateAnswerTermsConditions(term)
            }
            else{
              //crear
              this.saveAnswerTermsConditions(term)
            }
          }
          this.answer.state=4;
          this.answer.responseDate=new Date();
          this.updateAnswer(this.answer);
          
          //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
        }
        // else{
        //   this.router.navigate(['cot-principal'])
        //   //console.log('Mas tarde')
        // }
      })
    }
    else{
      console.log('Aceptado');
      swal({
        title:'HANSA Business',
        text:'¿Desea ingresar sus respuestas ahora?',
        icon:'info',
        buttons:['Si','Más tarde'],
        dangerMode:true,
      }).then((res)=>{
        if(!res){
          for(let term of this.termsConditions){
            this.updateAnswerTermsConditions(term)
          }
          this.answer.state=6;
          this.answer.responseDate=new Date();
          this.updateAnswer(this.answer);

          //this.router.navigate([`cot-principal/content-info/${this.idQuot}/quotation`])
        }
        else{
          for(let term of this.termsConditions){
            this.updateAnswerTermsConditions(term)
          }
          this.answer.state=7;
          this.answer.responseDate=new Date();
          this.updateAnswer(this.answer);

        }
      })
    }
  }

  //Metodo para modificar los terminos y condiciones
  updateAnswerTermsConditions(term:any){
    let termSend:any = {
      idAnswerTerm:term.idAnswerTerm,
      checkSupplier:term.checkSupplier,
      commentSupplier:term.commentSupplier
    }
    this._terms.updateAnswerTermsConditions(termSend)
    .subscribe()
  }

  //envia nuevos registros de answerterms para su guardado
  saveAnswerTermsConditions(term:any){
    let termSend:any = {
      idTerm:term.id,
      idAnswer:this.answer.id,
      checkSupplier:term.checkSupplier,
      commentSupplier:term.commentSupplier
    }

    this._terms.saveAnswerTermsConditions(termSend)
    .subscribe()
  }

  //modifica el estado de la cotizacion
  updateAnswer(answer:object){
      this._quotation.updateAnswer(answer).subscribe((res:any)=>{

        switch(res.state){
          case 4:
            swal("HANSA Business", "Se rechazó la cotización", "success").then(()=>{
            this.router.navigate(['cot-principal'])
            })
            break;
          case 6:
            this.router.navigate([`cot-principal/content-side/${this.idQuot}/content-info/quotation`])
            break;
          case 7:
            this.router.navigate(['cot-principal'])
            break;
          default:
            this.router.navigate(['cot-principal'])
            break;
        }
      })
  }
}

//modale para aswerTerms
export class AnswerTerms {
 constructor(
    public id?: any,
    public idTerm?: any,
    public checkSupplier?: boolean,
    public commentSupplier?: string,
    public idAnswer?: number
 ){}
}