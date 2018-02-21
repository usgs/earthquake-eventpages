import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImpactComponent } from './impact/impact.component';
import { DyfisummaryComponent } from './dyfisummary/dyfisummary.component';
import { ShakeMapSummaryComponent } from './shake-map-summary/shake-map-summary.component';
import { PagerSummaryComponent } from './pager-summary/pager-summary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImpactComponent, DyfisummaryComponent, ShakeMapSummaryComponent, PagerSummaryComponent]
})
export class ImpactModule { }
