import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TracingService {

  constructor(private http:HttpClient) { }

  //devuelve el listado de embarques dado un id oc
  getShipmentList(idOC:any){
    let url = `${URL_SERVICE}/api/shipments/ShipmentList?idOC=${idOC}`;
    return this.http.get(url);
  }

  //devuelve los eventos dado un embarque
  getEventsByidShipment(idShipment:any){
    let url = `${URL_SERVICE}/api/shipments/${idShipment}/events`;
    return this.http.get(url)
  }

}
