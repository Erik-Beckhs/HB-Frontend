import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { SidebarService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router:Router,
    public _sidebar:SidebarService,
    private title:Title
    ) { 
      this.getDataRoute().subscribe(
        res=>{
          //console.log('VALOR:', res.title)
          this.title.setTitle(res.title)
        }
      )
    }

  ngOnInit(): void {
    //console.log(this._sidebar.menu)
  }
  getDataRoute(){
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento:any) => evento.snapshot.firstChild===null),
      map((evento:any)=>evento.snapshot.data)
    )
  }
}
