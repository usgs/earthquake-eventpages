import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FocalMechanismComponent } from './focal-mechanism/focal-mechanism.component';

const focalMechanismRoutes: Routes = [
  {
    component: FocalMechanismComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(focalMechanismRoutes)]
})
export class FocalMechanismRoutingModule {}
