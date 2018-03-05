import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatIconModule, MatSortModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

import { ImpactRoutingModule } from './impact-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ImpactComponent } from './impact/impact.component';
import { DyfiSummaryComponent } from './dyfi-summary/dyfi-summary.component';
import { ShakemapSummaryComponent } from './shakemap-summary/shakemap-summary.component';
import { PagerSummaryComponent } from './pager-summary/pager-summary.component';


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
export class ImpactModule { }
