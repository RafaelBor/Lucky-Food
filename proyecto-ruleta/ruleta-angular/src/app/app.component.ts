import { Component, DoCheck, OnInit } from '@angular/core';
import {AdminService} from './services/admin.service';
import {RestauranteService} from './services/restaurante.service';
import {CategoriasServices} from './services/categorias.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AdminService, RestauranteService, CategoriasServices ]
})
export class AppComponent implements DoCheck, OnInit {
  title = 'ruleta-angular';
  public identity;
  public token;
  public restaurante;

  constructor(
    public _adminService: AdminService,
    public _restauranteService: RestauranteService
  ){
    this.identity = this._adminService.getIdentity();
    this.token = this._adminService.getToken();

  }

 ngOnInit(){
   console.log("Web cargada");
 } 

  
ngDoCheck(){
  this.identity = this._adminService.getIdentity();
  this.token = this._adminService.getToken();
}



}


