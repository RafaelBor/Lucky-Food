import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InstruccionesComponent } from './pages/instrucciones/instrucciones.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './usuarios/admin/admin.component';
import { CrearRestauranteComponent } from './usuarios/crear-restaurante/crear-restaurante.component';
import { CrearCuponesComponent } from './usuarios/crear-cupones/crear-cupones.component';
import { RestaurantesComponent } from './usuarios/restaurantes/restaurantes.component';



const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'instrucciones',
    component: InstruccionesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout/:sure',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },

  {
    path: 'crear-restaurante',
    component: CrearRestauranteComponent
  },
  {
    path: 'crear-cupones',
    component: CrearCuponesComponent
  },
  {
    path: 'restaurantes',
    component: RestaurantesComponent
  },
 
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
