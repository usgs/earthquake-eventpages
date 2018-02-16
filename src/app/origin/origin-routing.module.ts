import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OriginComponent } from './origin/origin.component';
import { DetailComponent } from './detail/detail.component';
import { PhaseComponent } from './phase/phase.component';
import { MagnitudeComponent } from './magnitude/magnitude.component';


const originRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: OriginComponent,
    children: [
      {
        path: 'detail',
        component: DetailComponent
      },
      {
        path: 'phase',
        component: PhaseComponent
      },
      {
        path: 'magnitude',
        component: MagnitudeComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'detail'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(originRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OriginRoutingModule { }
