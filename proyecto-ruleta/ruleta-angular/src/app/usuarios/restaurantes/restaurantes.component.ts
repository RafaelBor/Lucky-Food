import { Component, OnInit } from '@angular/core';
import {RestauranteService} from '../../services/restaurante.service';


@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  public restaurantes;

  constructor(
    public _restauranteService: RestauranteService
  ) { }

  ngOnInit() {
    this.getRestaurante();
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

}
