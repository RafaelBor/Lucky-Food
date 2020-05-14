import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuponesUsuarioPage } from './cupones-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: CuponesUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuponesUsuarioPageRoutingModule {}
