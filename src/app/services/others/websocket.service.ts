import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnInit{
  socketStatus:boolean = false;

  constructor(public socket:Socket) { 

  }

  ngOnInit(): void {
      this.checkStatus()
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor')
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor')
      this.socketStatus = false;
    })
  }
}
