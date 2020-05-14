import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaRestaurantePage } from './cuenta-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaRestaurantePageRoutingModule {}
