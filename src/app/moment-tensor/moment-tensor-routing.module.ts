import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MomentTensorComponent } from './moment-tensor/moment-tensor.component';


const momentTensorRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: MomentTensorComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(momentTensorRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MomentTensorRoutingModule { }
