import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})
export class CodigosService {
  public url:string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  agregarCodigo(token, codigo): Observable<any>{
    let json = JSON.stringify(codigo);
    let param = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization', token);;

    return this._http.post(this.url+'codigo/agregar-codigo', param, {headers: headers});
  }

  
  obtenerCuponesRestaurante(codigo): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url+'codigo/'+ codigo, {headers: headers});
  }

  
}
