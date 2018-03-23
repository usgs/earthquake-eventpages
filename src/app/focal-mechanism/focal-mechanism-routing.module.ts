import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FocalMechanismComponent } from './focal-mechanism/focal-mechanism.component';


const focalMechanismRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: FocalMechanismComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(focalMechanismRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FocalMechanismRoutingModule { }
