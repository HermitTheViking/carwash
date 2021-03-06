import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { WashPageRoutingModule } from './wash-routing.module';
import { WashPage } from './wash.page';
import { MenuComponentModule } from '../menu/menu.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MenuComponentModule,
    WashPageRoutingModule,
  ],
  declarations: [WashPage]
})
export class WashPageModule {}
