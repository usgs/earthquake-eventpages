import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgModule } from '@angular/core';

import { DyfiComponent } from './dyfi/dyfi.component';
import { DyfiRoutingModule } from './dyfi-routing.module';
import { DyfiService } from './dyfi.service';
import { IntensityComponent } from './intensity/intensity.component';
import { IntensityVsDistanceComponent } from './intensity-vs-distance/intensity-vs-distance.component';
import { NgxChartsModule } from '../shared/ngx-charts/ngx-charts.module';
import { ProductPageModule } from '../product-page/product-page.module';
import { ResponsesVsTimeComponent } from './responses-vs-time/responses-vs-time.component';
import { ResponsesComponent } from './responses/responses.component';
import { SharedModule } from '../shared/shared.module';
import { ZipComponent } from './zip/zip.component';

@NgModule({
  imports: [
    CommonModule,
    DyfiRoutingModule,
    ProductPageModule,
    MatTabsModule,
    NgxChartsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule
  ],
  declarations: [
    DyfiComponent,
    IntensityComponent,
    ZipComponent,
    IntensityVsDistanceComponent,
    ResponsesVsTimeComponent,
    ResponsesComponent
  ],
  providers: [
    DyfiService
  ]
})
export class DyfiModule { }
