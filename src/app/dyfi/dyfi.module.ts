import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

import {
  MdcTabModule,
  MdcIconModule
} from '@angular-mdc/web';

import { DyfiComponent } from './dyfi/dyfi.component';
import { DyfiRoutingModule } from './dyfi-routing.module';
import { IntensityComponent } from './intensity/intensity.component';
import { IntensityVsDistanceComponent } from './intensity-vs-distance/intensity-vs-distance.component';
import { ProductPageModule } from '../product-page/product-page.module';
import { NgxChartsModule } from '../shared/ngx-charts/ngx-charts.module';
import { ResponsesVsTimeComponent } from './responses-vs-time/responses-vs-time.component';
import { ResponsesComponent } from './responses/responses.component';
import { ZipComponent } from './zip/zip.component';



@NgModule({
  imports: [
    CommonModule,
    DyfiRoutingModule,
    ProductPageModule,
    MdcIconModule,
    MatTabsModule,
    MdcTabModule,
    NgxChartsModule
  ],
  declarations: [
    DyfiComponent,
    IntensityComponent,
    ZipComponent,
    IntensityVsDistanceComponent,
    ResponsesVsTimeComponent,
    ResponsesComponent
  ]
})
export class DyfiModule { }
