import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoRestaurantePage } from './codigo-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoRestaurantePageRoutingModule {}
