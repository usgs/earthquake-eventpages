import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MomentTensorComponent } from './moment-tensor/moment-tensor.component';

const momentTensorRoutes: Routes = [
  {
    component: MomentTensorComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(momentTensorRoutes)]
})
export class MomentTensorRoutingModule {}
