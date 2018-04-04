import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LosspagerComponent } from './losspager/losspager.component';
import { LosspagerRoutingModule } from './losspager-routing.module';
import { ProductPageModule } from '../product-page/product-page.module';

@NgModule({
  imports: [
    CommonModule,

    LosspagerRoutingModule,
    ProductPageModule
  ],
  declarations: [
    LosspagerComponent
  ]
})
export class LosspagerModule { }
