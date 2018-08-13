import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagerComponent } from './pager/pager.component';

const pagerRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: PagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagerRoutes)],
  exports: [RouterModule]
})
export class PagerRoutingModule {}
