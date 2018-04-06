import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagerComponent } from './pager/pager.component';
import { PagerRoutingModule } from './pager-routing.module';
import { ProductPageModule } from '../product-page/product-page.module';

@NgModule({
  imports: [
    CommonModule,

    PagerRoutingModule,
    ProductPageModule
  ],
  declarations: [
    PagerComponent
  ]
})
export class PagerModule { }
