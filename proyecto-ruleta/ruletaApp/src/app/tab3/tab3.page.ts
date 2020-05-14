import { Component, OnInit } from '@angular/core';
import {RestauranteService} from '../services/restaurante.service'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public restaurantes;

  constructor(
    public _restauranteService: RestauranteService
  ) {

  }

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
