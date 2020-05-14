import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponesUsuarioPageRoutingModule } from './cupones-usuario-routing.module';

import { CuponesUsuarioPage } from './cupones-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponesUsuarioPageRoutingModule
  ],
  declarations: [CuponesUsuarioPage]
})
export class CuponesUsuarioPageModule {}
