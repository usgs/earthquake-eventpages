import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagerComponent } from './pager/pager.component';

const pagerRoutes: Routes = [
  {
    component: PagerComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(pagerRoutes)]
})
export class PagerRoutingModule {}
