import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsResPageRoutingModule } from './tabs-res-routing.module';

import { TabsResPage } from './tabs-res.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsResPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabsResPage]
})
export class TabsResPageModule {}
