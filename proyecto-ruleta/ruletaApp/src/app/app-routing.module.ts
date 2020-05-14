import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {path: 'logout/:sure',
    loadChildren: ()=> import('./pages/login/login.module').then( m => m.LoginPageModule)},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'menu-juegos',
    loadChildren: () => import('./pages/menu-juegos/menu-juegos.module').then( m => m.MenuJuegosPageModule)
    
  },
  {
    path: 'comprar-turno',
    loadChildren: () => import('./pages/comprar-turno/comprar-turno.module').then( m => m.ComprarTurnoPageModule)
  },
  {
    path: 'cupones-usuario/:id',
    loadChildren: () => import('./pages/cupones-usuario/cupones-usuario.module').then( m => m.CuponesUsuarioPageModule)
  },
  {
    path: 'juego-adivinar',
    loadChildren: () => import('./pages/juego-adivinar/juego-adivinar.module').then( m => m.JuegoAdivinarPageModule)
  },
  {
    path: 'tabs-res',
    loadChildren: () => import('./usuario-restaurante/tabs-res/tabs-res.module').then( m => m.TabsResPageModule)
  },
  {
    path: 'inicio-restaurante',
    loadChildren: () => import('./usuario-restaurante/inicio-restaurante/inicio-restaurante.module').then( m => m.InicioRestaurantePageModule)
  },
  {
    path: 'cuenta-restaurante',
    loadChildren: () => import('./usuario-restaurante/cuenta-restaurante/cuenta-restaurante.module').then( m => m.CuentaRestaurantePageModule)
  },
  {
    path: 'codigo-restaurante/:codigo',
    loadChildren: () => import('./usuario-restaurante/codigo-restaurante/codigo-restaurante.module').then( m => m.CodigoRestaurantePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
