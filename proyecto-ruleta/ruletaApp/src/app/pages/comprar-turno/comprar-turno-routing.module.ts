import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComprarTurnoPage } from './comprar-turno.page';

const routes: Routes = [
  {
    path: '',
    component: ComprarTurnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprarTurnoPageRoutingModule {}
