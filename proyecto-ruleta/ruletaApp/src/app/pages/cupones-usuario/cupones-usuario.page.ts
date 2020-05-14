import { Component, OnInit, DoCheck } from '@angular/core';
import {CuponesService} from '../../services/cupones.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LoginService} from '../../services/login.service'

@Component({
  selector: 'app-cupones-usuario',
  templateUrl: './cupones-usuario.page.html',
  styleUrls: ['./cupones-usuario.page.scss'],
})
export class CuponesUsuarioPage implements OnInit, DoCheck {
  public cupones;
  public codigos;
  public status;
  public token;
  public identity;

  constructor(
    public _cuponesService: CuponesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) { 
    this.token = this._loginService.getToken();
   // this.identity = this._loginService.getIdentity();

  }

  ngDoCheck(){
   // this.identity = this._loginService.getIdentity();
  }

  ngOnInit() {
    this.getCodeByUser();
   // this.identity = this._loginService.getIdentity();
   // console.log(this.identity.sub);
  }

  getCodeByUser(){
    this._route.params.subscribe(params =>{
      let id = +params['id'];

      this._cuponesService.getCode(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.codigos = response.codigos;
            console.log(this.codigos);
            this.status = 'success';
  
          }else{
            this.status = 'error';
          }
        },
          error =>{
            this.status = 'error'
            console.log(<any>error);
          }
      )
    });
  }

}
