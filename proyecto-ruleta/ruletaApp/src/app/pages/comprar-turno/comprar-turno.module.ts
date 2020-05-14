import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprarTurnoPageRoutingModule } from './comprar-turno-routing.module';

import { ComprarTurnoPage } from './comprar-turno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprarTurnoPageRoutingModule
  ],
  declarations: [ComprarTurnoPage]
})
export class ComprarTurnoPageModule {}
