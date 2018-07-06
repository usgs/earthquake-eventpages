import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiniteFaultComponent } from './finite-fault/finite-fault.component';
import { FiniteFaultRoutingModule } from './finite-fault-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductPageModule } from '../product-page/product-page.module';

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
