import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    NgxChartsModule,
    SharedModule
  ],
  providers: [DyfiService]
})
export class DyfiModule {}
