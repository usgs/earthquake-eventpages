import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';

import { OriginRoutingModule } from './origin-routing.module';

import { DetailComponent } from './detail/detail.component';
import { DownloadComponent } from './download/download.component';
import { MagnitudeComponent } from './magnitude/magnitude.component';
import { OriginComponent } from './origin/origin.component';
import { PhaseComponent } from './phase/phase.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ProductPageModule,

    OriginRoutingModule
  ],
  declarations: [
    DetailComponent,
    DownloadComponent,
    MagnitudeComponent,
    OriginComponent,
    PhaseComponent
  ],
  entryComponents: [
    DownloadComponent
  ]
})
export class OriginModule {
}
