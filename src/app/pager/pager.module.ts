import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageModule } from '../product-page/product-page.module';
import { PagerComponent } from './pager/pager.component';
import { PagerRoutingModule } from './pager-routing.module';
import { PagerXmlService } from './pagerxml.service';
import { PagerPopulationComponent } from './pager-population/pager-population.component';


@NgModule({
  imports: [
    CommonModule,
    ProductPageModule,

    PagerRoutingModule
  ],
  declarations: [
    PagerComponent,
    PagerPopulationComponent
  ],
  providers: [
    PagerXmlService
  ]
})
export class PagerModule { }
