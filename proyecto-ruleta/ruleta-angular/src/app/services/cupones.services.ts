import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import {cupones} from '../models/cupones';


@Injectable({
  providedIn: 'root'
})
export class CuponesServices {
  public url:string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
   }

   create(token, cupones): Observable<any>{

    let json = JSON.stringify(cupones);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
    
    return this._http.post(this.url + 'cupones', params, {headers: headers});
}
}