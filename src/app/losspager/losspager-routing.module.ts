import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LosspagerComponent } from './losspager/losspager.component';

const losspagerRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: LosspagerComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(losspagerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LosspagerRoutingModule { }
