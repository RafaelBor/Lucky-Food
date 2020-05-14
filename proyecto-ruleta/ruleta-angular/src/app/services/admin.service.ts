import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from './global';
import {Admin} from '../models/admin';

@Injectable()
export class AdminService {
    public url:string;
    public token;
    public identity;
    constructor (
        public _http: HttpClient
        
    ){
        this.url = global.url;
    }

    test(){
        return 'hola';
    }


    signup(admin, gettoken = null): Observable<any>{
        if(gettoken != null){
            admin.gettoken = 'true'
        }

        let json = JSON.stringify(admin);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login', params, {headers: headers} );
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