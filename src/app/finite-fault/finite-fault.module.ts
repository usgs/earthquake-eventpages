import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';
import { FiniteFaultRoutingModule } from './finite-fault-routing.module';
import { FiniteFaultComponent } from './finite-fault/finite-fault.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductPageModule,
    FiniteFaultRoutingModule
  ],
  declarations: [
    FiniteFaultComponent
  ]
})
export class FiniteFaultModule { }
