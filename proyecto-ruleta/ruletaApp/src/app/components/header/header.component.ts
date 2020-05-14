import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {LoginService} from '../../services/login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LoginService]
})
export class HeaderComponent implements OnInit, DoCheck {
  public token;
  public identity;

  constructor( 
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute,
    private MenuCtrl: MenuController
    ) {
      this.identity = this._loginService.getIdentity();
      this.token = this._loginService.getToken();
     }

  
     ngDoCheck(){
      this.identity = this._loginService.getIdentity();
      this.token = this._loginService.getToken();
      
      
    }
  

  ngOnInit() {
  
    
  }

  ToggleMenu(){
    this.MenuCtrl.toggle();
  }

  
 


}
