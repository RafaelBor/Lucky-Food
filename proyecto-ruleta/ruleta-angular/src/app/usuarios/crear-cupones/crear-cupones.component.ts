import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {cupones} from '../../models/cupones';

import {RestauranteService} from '../../services/restaurante.service';
import {CategoriasServices} from '../../services/categorias.service';
import {CuponesServices} from '../../services/cupones.services'

@Component({
  selector: 'app-crear-cupones',
  templateUrl: './crear-cupones.component.html',
  styleUrls: ['./crear-cupones.component.css'],
  providers: []
})
export class CrearCuponesComponent implements OnInit {
  public restaurantes;
  public categorias;
  public token;
  public identity;
  public status;
  public cupones;

  constructor(
    private _router: ActivatedRoute,
    private _route: Router,
    private _adminService: AdminService,
    public _cuponesServices: CuponesServices,
    public _restauranteService: RestauranteService,
    public _categoriasServices: CategoriasServices
  ) {
    this.identity = this._adminService.getIdentity();
    this.token = this._adminService.getToken();
    this.cupones = new cupones(1, 1, 1, "", 1,1,1, "");
   }

  ngOnInit() {
    this.getCategorias();
    this.getRestaurante();
    
  }

  onSubmit(form){
    this._cuponesServices.create(this.token, this.cupones).subscribe(
      response =>{
        if(response.status == 'success'){
          this.cupones = response.cupones;
          this.status = 'success';

          form.reset();

         this._route.navigate(['/restaurantes']);
        }else{
          this.status = 'error';
        }
      },
        error =>{
          this.status = 'error'
          console.log(<any>error);
        }
    )
  }
  

  getRestaurante(){
    this._restauranteService.getRestaurante().subscribe(
      response =>{
        if(response.status == 'success'){
          this.restaurantes = response.restaurante;
          console.log(this.restaurantes);
        }
      }, error =>{
        console.log(error)
      }
    )
  }

  getCategorias(){
    this._categoriasServices.getCategorias().subscribe(
      response =>{
        if(response.status == 'success'){
          this.categorias = response.categorias;
          console.log(this.categorias);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
