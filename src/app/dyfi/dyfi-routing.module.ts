import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DyfiComponent } from './dyfi/dyfi.component';
import { IntensityComponent } from './intensity/intensity.component';
import { ZipComponent } from './zip/zip.component';
import { IntensityVsDistanceComponent } from './intensity-vs-distance/intensity-vs-distance.component';
import { ResponsesVsTimeComponent } from './responses-vs-time/responses-vs-time.component';
import { ResponsesComponent } from './responses/responses.component';

const dyfiRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: DyfiComponent,
    children: [
      {
        path: 'intensity',
        component: IntensityComponent
      },
      {
        path: 'zip',
        component: ZipComponent
      },
      {
        path: 'intensity-vs-distance',
        component: IntensityVsDistanceComponent
      },
      {
        path: 'responses-vs-time',
        component: ResponsesVsTimeComponent
      },
      {
        path: 'responses',
        component: ResponsesComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'intensity'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(dyfiRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DyfiRoutingModule { }
