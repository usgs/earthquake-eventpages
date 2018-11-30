import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductPageModule } from '../product-page/product-page.module';

import { SharedModule } from '@shared/shared.module';
import { ShakeAlertComponent } from './shake-alert/shake-alert.component';
import { ShakeAlertRoutingModule } from './shake-alert-routing.module';

@NgModule({
  declarations: [ShakeAlertComponent],
  exports: [],
  imports: [
    CommonModule,
    ProductPageModule,
    RouterModule,
    ShakeAlertRoutingModule,
    SharedModule
  ]
})
export class ShakeAlertModule {}
