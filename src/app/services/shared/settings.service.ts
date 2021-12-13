import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings:Settings={
    theme:'default-dark',
    themeUrl:'assets/css/colors/default-dark.css'
  }

  constructor() { 
    this.getTheme()
  }

  saveTheme(){
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }

  getTheme(){
    let value:any = localStorage.getItem('settings')
    if(value != null){
      this.settings = JSON.parse(value)
      console.log('Tema existente')
    }
    else{
      this.settings.theme='blue'
      console.log('Tema por defecto')
    }
    this.applyTheme(this.settings.theme)
  }

  applyTheme(val:string){
    const url = `assets/css/colors/${val}.css`
    document.getElementById('theme')?.setAttribute('href', url)
    this.settings.theme=val;
    this.settings.themeUrl=url;
    this.saveTheme()
  }


}

interface Settings {
  theme:string,
  themeUrl:string
}
