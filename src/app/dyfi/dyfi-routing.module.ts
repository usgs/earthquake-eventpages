import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DyfiComponent } from './dyfi/dyfi.component';
import { IntensityVsDistanceComponent } from './intensity-vs-distance/intensity-vs-distance.component';
import { IntensityComponent } from './intensity/intensity.component';
import { ResponsesVsTimeComponent } from './responses-vs-time/responses-vs-time.component';
import { ResponsesComponent } from './responses/responses.component';
import { ZipComponent } from './zip/zip.component';

const dyfiRoutes: Routes = [
  {
    children: [
      {
        component: IntensityComponent,
        path: 'intensity'
      },
      {
        component: ZipComponent,
        path: 'zip'
      },
      {
        component: IntensityVsDistanceComponent,
        path: 'intensity-vs-distance'
      },
      {
        component: ResponsesVsTimeComponent,
        path: 'responses-vs-time'
      },
      {
        component: ResponsesComponent,
        path: 'responses'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'intensity'
      }
    ],
    component: DyfiComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(dyfiRoutes)]
})
export class DyfiRoutingModule {}
