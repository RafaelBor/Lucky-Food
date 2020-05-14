import { Component, OnInit, DoCheck } from '@angular/core';
import {LoginService} from './services/login.service'



import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements DoCheck {
  public identity;
  public token;
  
  constructor(
   
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _loginService: LoginService
  ) {
    this.initializeApp();
    
  }

  
  ngOnInit() {
    
   }

 
   ngDoCheck(){
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



}
