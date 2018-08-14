import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatTableModule } from '@angular/material';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '@shared/shared.module';
import { PagerCitiesComponent } from './pager-cities/pager-cities.component';
import { PagerPopulationComponent } from './pager-population/pager-population.component';
import { PagerRoutingModule } from './pager-routing.module';
import { PagerComponent } from './pager/pager.component';
import { PagerXmlService } from './pagerxml.service';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    ProductPageModule,
    SharedModule,

    PagerRoutingModule
  ],
  declarations: [
    PagerComponent,
    PagerPopulationComponent,
    PagerCitiesComponent
  ],
  providers: [PagerXmlService]
})
export class PagerModule {}
