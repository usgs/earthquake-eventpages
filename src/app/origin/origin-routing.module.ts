import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from './detail/detail.component';
import { MagnitudeComponent } from './magnitude/magnitude.component';
import { OriginComponent } from './origin/origin.component';
import { PhaseComponent } from './phase/phase.component';

const originRoutes: Routes = [
  {
    children: [
      {
        component: DetailComponent,
        path: 'detail'
      },
      {
        component: PhaseComponent,
        path: 'phase'
      },
      {
        component: MagnitudeComponent,
        path: 'magnitude'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'detail'
      }
    ],
    component: OriginComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(originRoutes)]
})
export class OriginRoutingModule {}
