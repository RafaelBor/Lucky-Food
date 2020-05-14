import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { InstruccionesComponent } from './pages/instrucciones/instrucciones.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './usuarios/admin/admin.component';

import { CrearRestauranteComponent } from './usuarios/crear-restaurante/crear-restaurante.component';
import { CrearCuponesComponent } from './usuarios/crear-cupones/crear-cupones.component';
import { RestaurantesComponent } from './usuarios/restaurantes/restaurantes.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstruccionesComponent,
    LoginComponent,
    AdminComponent,
    CrearRestauranteComponent,
    CrearCuponesComponent,
    RestaurantesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
