import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

import { NgxChartsModule } from '../shared/ngx-charts/ngx-charts.module';

import { DyfiComponent } from './dyfi/dyfi.component';
import { DyfiRoutingModule } from './dyfi-routing.module';
import { IntensityComponent } from './intensity/intensity.component';
import { IntensityVsDistanceComponent } from './intensity-vs-distance/intensity-vs-distance.component';
import { ProductPageModule } from '../product-page/product-page.module';
import { ResponsesVsTimeComponent } from './responses-vs-time/responses-vs-time.component';
import { ResponsesComponent } from './responses/responses.component';
import { ZipComponent } from './zip/zip.component';

@NgModule({
  imports: [
    CommonModule,
    DyfiRoutingModule,
    ProductPageModule,
    MatTabsModule,
    NgxChartsModule
  ],
  declarations: [
    DyfiComponent,
    IntensityComponent,
    ZipComponent,
    IntensityVsDistanceComponent,
    ResponsesVsTimeComponent,
    ResponsesComponent]
})
export class DyfiModule { }
