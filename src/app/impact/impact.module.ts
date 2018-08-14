import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatDialogModule,
  MatIconModule,
  MatSortModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '@shared/shared.module';
import { DyfiSummaryComponent } from './dyfi-summary/dyfi-summary.component';
import { ImpactComponent } from './impact/impact.component';
import { ImpactRoutingModule } from './impact-routing.module';
import { PagerSummaryComponent } from './pager-summary/pager-summary.component';
import { ShakemapSummaryComponent } from './shakemap-summary/shakemap-summary.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    SharedModule,

    ImpactRoutingModule
  ],
  declarations: [
    ImpactComponent,
    DyfiSummaryComponent,
    ShakemapSummaryComponent,
    PagerSummaryComponent
  ]
})
export class ImpactModule {}
