import { Component, OnInit } from '@angular/core';
import {CuponesService} from '../services/cupones.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LoginService} from '../services/login.service'



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public cupones;
  public codigos;
  public status;
  public token;

  constructor(
    public _cuponesService: CuponesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.getToken();
  }

  ngOnInit() {
   this.getCupones();
   
  }

  getCupones(){
    this._cuponesService.getCupones().subscribe(
      response =>{
        if(response.status == 'success'){
          this.cupones = response.cupones;
          console.log(this.cupones);
        }
      }, error =>{
        console.log(error)
      }
    )
  }



}
