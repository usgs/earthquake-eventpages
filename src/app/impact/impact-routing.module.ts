import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImpactComponent } from './impact/impact.component';

const impactRoutes: Routes = [
  {
    component: ImpactComponent,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(impactRoutes)]
})
export class ImpactRoutingModule {}
