import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    public url:string;
    public identity;
    public token;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  register(user): Observable<any>{
    let json = JSON.stringify(user);
    let param = 'json=' +json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'cliente', param, {headers: headers});
}
  
  signup(user, gettoken = null): Observable<any>{
    if(gettoken != null){
        user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let param = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(this.url+'login', param, {headers: headers});

    return 
}



getIdentity(){
  let identity = JSON.parse(localStorage.getItem('identity'));

  if(identity && identity != "undefined"){
      this.identity = identity;
  }else{
      this.identity = null;
  }

  return this.identity;
}

getToken(){
  let token = localStorage.getItem('token');

  if(token != 'undefined' && token){
      this.token = token;
  }else{
      this.token = null;
  }

  return this.token;
}
}


