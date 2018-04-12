import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about/about.component';
import { GroundFailureComponent } from './ground-failure/ground-failure.component';
import { GroundFailureRoutingModule } from './ground-failure-routing.module';
import { SummaryComponent } from './summary/summary.component';


@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,

    ProductPageModule,
    SharedModule,

    GroundFailureRoutingModule
  ],
  declarations: [
    AboutComponent,
    GroundFailureComponent,
    SummaryComponent
  ]
})
export class GroundFailureModule { }
