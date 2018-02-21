import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DyfisummaryComponent } from './dyfisummary/dyfisummary.component';
import { ImpactComponent } from './impact/impact.component';
import { PagerSummaryComponent } from './pager-summary/pager-summary.component';
import { ShakeMapSummaryComponent } from
    './shake-map-summary/shake-map-summary.component';


const impactRoutes: Routes = [
  {
    path: '',
    component: ImpactComponent,
    children: [
      {
        path: 'dyfisummary',
        component: DyfisummaryComponent
      },
      {
        path: 'impact',
        component: ImpactComponent
      },
      {
        path: 'pager-summary',
        component: PagerSummaryComponent
      },
      {
        path: 'shake-map-summary',
        component: ShakeMapSummaryComponent
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(impactRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ImpactRoutingModule { }