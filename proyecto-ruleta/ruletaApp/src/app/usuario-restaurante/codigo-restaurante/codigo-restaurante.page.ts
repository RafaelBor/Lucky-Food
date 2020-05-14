import { Component, OnInit } from '@angular/core';
import {CodigosService} from '../../services/codigos.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {VentasService} from '../../services/ventas.service';
import {Ventas} from '../../models/Ventas'
import {Codigos} from '../../models/codigos'

@Component({
  selector: 'app-codigo-restaurante',
  templateUrl: './codigo-restaurante.page.html',
  styleUrls: ['./codigo-restaurante.page.scss'],
})
export class CodigoRestaurantePage implements OnInit {
  public cod;
  public status;
  public identity;
  public ventas: Ventas;
  public codigo: Codigos;

  constructor(
    private _codigoService: CodigosService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _ventasService: VentasService
  ) { 
   
    this.identity = this._loginService.getIdentity();
    this.ventas = new Ventas(1, 1, "", "", 1);
    this.codigo = new Codigos(1, 1, 1, "");
  }

  ngOnInit() {
    this.obtenerCuponesRestaurante();
    this.identity = this._loginService.getIdentity();
    console.log(this.cod);
    
  }

  onSubmit(Form){
    console.log(this.ventas);
  }

  obtenerCuponesRestaurante(){
     let codigo = this._route.snapshot.paramMap.get('codigo');

      this._codigoService.obtenerCuponesRestaurante(codigo).subscribe(
        response =>{
          if(response.status == 'success'){
            this.cod = response.codigos;
            console.log(this.cod);
            console.log(response);
            
  
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
  
}
