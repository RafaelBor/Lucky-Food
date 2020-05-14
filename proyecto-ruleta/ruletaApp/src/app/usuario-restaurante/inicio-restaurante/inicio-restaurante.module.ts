import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioRestaurantePageRoutingModule } from './inicio-restaurante-routing.module';

import { InicioRestaurantePage } from './inicio-restaurante.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioRestaurantePageRoutingModule,
    ComponentsModule
  ],
  declarations: [InicioRestaurantePage]
})
export class InicioRestaurantePageModule {}
