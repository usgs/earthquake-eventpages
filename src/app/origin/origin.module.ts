import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { OriginComponent } from './origin/origin.component';
import { OriginRoutingModule } from './origin-routing.module';
import { ProductPageModule } from '../product-page/product-page.module';

import { DetailComponent } from './detail/detail.component';
import { PhaseComponent } from './phase/phase.component';
import { MagnitudeComponent } from './magnitude/magnitude.component';


@NgModule({
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ProductPageModule,

    OriginRoutingModule
  ],
  declarations: [
    DetailComponent,
    MagnitudeComponent,
    OriginComponent,
    PhaseComponent
  ]
})
export class OriginModule {
}
