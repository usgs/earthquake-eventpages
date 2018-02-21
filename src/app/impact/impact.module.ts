import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactRoutingModule } from './impact-routing.module';

import { ImpactComponent } from './impact/impact.component';
import { DyfiSummaryComponent } from './DyfiSummary/DyfiSummary.component';
import { ShakeMapSummaryComponent } from './shake-map-summary/shake-map-summary.component';
import { PagerSummaryComponent } from './pager-summary/pager-summary.component';

@NgModule({
  imports: [
    CommonModule,
    ImpactRoutingModule
  ],
  declarations: [
    ImpactComponent,
    DyfiSummaryComponent,
    ShakeMapSummaryComponent,
    PagerSummaryComponent
  ]
})
export class ImpactModule { }
