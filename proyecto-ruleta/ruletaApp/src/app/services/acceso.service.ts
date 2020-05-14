import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  public url:string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  getAcceso(acceso): Observable<any>{
    
    let json = JSON.stringify(acceso);
    let param = 'json=' +json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'acceso', param, {headers: headers});
  }

  sumarPutanje(token, user): Observable<any>{
    let json = JSON.stringify(user);
    let param = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

    return this._http.put(this.url+'puntaje', param, {headers: headers});
}

turnos(token, user): Observable<any>{
  let json = JSON.stringify(user);
  let param = 'json='+json;

  let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                      .set('Authorization', token);

  return this._http.put(this.url+'turnos', param, {headers: headers});
}

  
}
