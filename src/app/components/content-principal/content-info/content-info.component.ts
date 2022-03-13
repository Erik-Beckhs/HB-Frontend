import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from 'src/app/services/service.index';

@Component({
  selector: 'app-content-info',
  templateUrl: './content-info.component.html',
  styleUrls: ['./content-info.component.css']
})
export class ContentInfoComponent implements OnInit {
  idQuot:any

  constructor(
    private route:ActivatedRoute,
    private _quotation:QuotationService
    ) {
      this.idQuot = this._quotation.idQuot
     }

  ngOnInit(): void {

  }
}
