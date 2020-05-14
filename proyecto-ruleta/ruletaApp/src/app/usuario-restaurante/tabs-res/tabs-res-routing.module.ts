import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TabsResPage } from './tabs-res.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-restaurante'
  },
  {
    path: '',
    component: TabsResPage,
    children: [
      {
        path: 'inicio-restaurante',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inicio-restaurante/inicio-restaurante.module').then(m => m.InicioRestaurantePageModule)
          }
        ]
      },
      {
        path: 'cuenta-restaurante',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cuenta-restaurante/cuenta-restaurante.module').then(m => m.CuentaRestaurantePageModule)
          }
        ]
      },
      
    ]
  },
  {
    path: '',
    redirectTo: 'inicio-restaurante',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsResPageRoutingModule {}
