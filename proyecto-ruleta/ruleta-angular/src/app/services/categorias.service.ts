import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import {categorias} from '../models/categorias';

@Injectable({
    providedIn: 'root'
  })
  export class CategoriasServices {
    public url:string;
  
    constructor(
      public _http: HttpClient
    ) {
      this.url = global.url;
     }


     
     getCategorias(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
        return this._http.get(this.url + 'categorias', {headers: headers});
    }

    }