import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageModule } from '../product-page/product-page.module';

import { OriginComponent } from './origin/origin.component';
import { OriginDetailsComponent } from './origin-details/origin-details.component';


@NgModule({
  imports: [
    CommonModule,
    ProductPageModule
  ],
  declarations: [
    OriginComponent,
    OriginDetailsComponent
  ],
  exports: [
    OriginComponent
  ]
})
export class OriginModule {
}
