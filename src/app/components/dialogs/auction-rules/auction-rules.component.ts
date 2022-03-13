import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auction-rules',
  templateUrl: './auction-rules.component.html',
  styleUrls: ['./auction-rules.component.css']
})
export class AuctionRulesComponent implements OnInit {

  constructor(
    private router:Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
  }

  ngOnInit(): void {
    console.log('reglas desde mejora')
    console.log(this.data);
  }

  return(){
    this.router.navigate(['cot-principal']);
  }

}
