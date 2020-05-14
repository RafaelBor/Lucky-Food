import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaRestaurantePageRoutingModule } from './cuenta-restaurante-routing.module';

import { CuentaRestaurantePage } from './cuenta-restaurante.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaRestaurantePageRoutingModule,
    ComponentsModule
  ],
  declarations: [CuentaRestaurantePage]
})
export class CuentaRestaurantePageModule {}
