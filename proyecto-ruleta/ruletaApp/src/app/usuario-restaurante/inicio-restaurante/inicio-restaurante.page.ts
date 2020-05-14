import { Component, OnInit } from '@angular/core';
import {Codigos} from '../../models/codigos';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-inicio-restaurante',
  templateUrl: './inicio-restaurante.page.html',
  styleUrls: ['./inicio-restaurante.page.scss'],
})
export class InicioRestaurantePage implements OnInit {
  public codigos: Codigos;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.codigos = new Codigos(1, 1, 1, "");
  }

  ngOnInit() {
  }

  onSubmit(Form){
    console.log(this.codigos);
    this._router.navigate(['codigo-restaurante', this.codigos.codigo]);
    Form.reset();
  }

}
