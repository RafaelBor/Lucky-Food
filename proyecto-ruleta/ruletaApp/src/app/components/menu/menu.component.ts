import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LoginService} from '../../services/login.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, DoCheck  {

  public token;
  public identity;
  
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _loginService: LoginService
  ) {
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
   }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
  }

  ngDoCheck(){
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
  }

  

  logout(){
    this._route.params.subscribe(params =>{
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redireccionar a inicio
        this._router.navigate(['inicio']);
        
      }
    })
}

}
