import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { MdcTabModule, MdcIconModule } from '@angular-mdc/web';

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
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    DyfiRoutingModule,
    ProductPageModule,
    MatButtonModule,
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
