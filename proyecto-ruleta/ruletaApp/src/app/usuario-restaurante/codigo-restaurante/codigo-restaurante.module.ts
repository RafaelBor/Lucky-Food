import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoRestaurantePageRoutingModule } from './codigo-restaurante-routing.module';

import { CodigoRestaurantePage } from './codigo-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoRestaurantePageRoutingModule
  ],
  declarations: [CodigoRestaurantePage]
})
export class CodigoRestaurantePageModule {}
