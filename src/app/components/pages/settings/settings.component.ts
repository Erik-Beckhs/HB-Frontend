import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/shared/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public _settings:SettingsService) { }

  ngOnInit(): void {
    this.loadCheck()
  }

  //permite visualizar el tema seleccionado
  changeTheme(value:string, link:any){

    this.checkTheme(link)

    this._settings.applyTheme(value)
  }

  //marca el tema seleccionado
  checkTheme(link:any){
    let selectors:any=document.getElementsByClassName('selector')
    for(let res of selectors){
      res.classList.remove('working')
    }
    link.classList.add('working')
  }

  //marca el tema almacenado en localStorage
  loadCheck(){
    let selectors:any = document.getElementsByClassName('selector')
    let theme = this._settings.settings.theme
    for(let res of selectors){
      if(theme == res.getAttribute('data-theme')){
        res.classList.add('working');
        break;
      }
    }
  }
}
