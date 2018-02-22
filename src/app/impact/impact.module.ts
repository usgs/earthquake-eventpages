import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactRoutingModule } from './impact-routing.module';

import { ImpactComponent } from './impact/impact.component';
import { ImpactDyfiSummaryComponent } from './impact-dyfi-summary/impact-dyfi-summary.component';
import { ImpactShakemapSummaryComponent } from './impact-shakemap-summary/impact-shakemap-summary.component';
import { ImpactPagerSummaryComponent } from './impact-pager-summary/impact-pager-summary.component';


@NgModule({
  imports: [
    CommonModule,
    ImpactRoutingModule
  ],
  declarations: [
    ImpactComponent,
    ImpactDyfiSummaryComponent,
    ImpactShakemapSummaryComponent,
    ImpactPagerSummaryComponent
  ]
})
export class ImpactModule { }
