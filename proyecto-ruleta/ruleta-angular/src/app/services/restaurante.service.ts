import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import {Restaurante} from '../models/restaurante';


@Injectable()
export class RestauranteService {
  public url:string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
   }

   create(token, restaurante): Observable<any>{

    let json = JSON.stringify(restaurante);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
    
    return this._http.post(this.url + 'restaurante', params, {headers: headers});
   }

   getRestaurante(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.get(this.url + 'restaurante', {headers: headers});
}



}
