import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/service.index';


@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  onLogout():void{
    //alert('salir')
    this.authService.logoutUser()
    location.reload()
    //this.router.navigate([''])
  }
}
