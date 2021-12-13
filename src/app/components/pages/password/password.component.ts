import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPasswordComponent } from '../../dialogs/confirm-password/confirm-password.component';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    
  }

  openDialog(){
    this.dialog.open(ConfirmPasswordComponent, {
      width:'30%'
    });
  }

}
