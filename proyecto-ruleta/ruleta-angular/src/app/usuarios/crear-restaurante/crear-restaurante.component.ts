import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AdminService} from '../../services/admin.service';
import {RestauranteService} from '../../services/restaurante.service';
import { Restaurante} from '../../models/restaurante';


@Component({
  selector: 'app-crear-restaurante',
  templateUrl: './crear-restaurante.component.html',
  styleUrls: ['./crear-restaurante.component.css'],
  providers: [AdminService]
})
export class CrearRestauranteComponent implements OnInit {
  public token;
  public identity;
  public status;
  public restaurante: Restaurante

  constructor(
    private _router: ActivatedRoute,
    private _route: Router,
    private _adminService: AdminService,
    private _restauranteService: RestauranteService
  ) {
    this.identity = this._adminService.getIdentity();
    this.token = this._adminService.getToken();
    this.restaurante = new Restaurante(1, this.identity.sub, "", "", "", "", "",0, 0, "");

   }

  ngOnInit() {
  }

  onSubmit(Form){
    this._restauranteService.create(this.token, this.restaurante).subscribe(
      response =>{
        if(response.status == 'success'){
          this.restaurante = response.restaurante;
          this.status = 'success';

          Form.reset();

         // this._route.navigate(['/inicio']);
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
