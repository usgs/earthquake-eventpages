import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';

import { MdcTabModule, MdcIconModule } from '@angular-mdc/web';

import { NgxChartsModule } from '@shared/ngx-charts/ngx-charts.module';
import { DyfiRoutingModule } from './dyfi-routing.module';
import { DyfiService } from './dyfi.service';
import { DyfiComponent } from './dyfi/dyfi.component';
import { IntensityVsDistanceComponent } from './intensity-vs-distance/intensity-vs-distance.component';
import { IntensityComponent } from './intensity/intensity.component';
import { ProductPageModule } from '../product-page/product-page.module';
import { ResponsesVsTimeComponent } from './responses-vs-time/responses-vs-time.component';
import { ResponsesComponent } from './responses/responses.component';
import { SharedModule } from '@shared/shared.module';
import { ZipComponent } from './zip/zip.component';

@NgModule({
  declarations: [
    DyfiComponent,
    IntensityComponent,
    ZipComponent,
    IntensityVsDistanceComponent,
    ResponsesVsTimeComponent,
    ResponsesComponent
  ],
  imports: [
    CommonModule,
    DyfiRoutingModule,
    ProductPageModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MdcIconModule,
    MatTabsModule,
    MdcTabModule,
    MatTableModule,
    MatTooltipModule,
    NgxChartsModule,
    SharedModule
  ],
  providers: [DyfiService]
})
export class DyfiModule {}
