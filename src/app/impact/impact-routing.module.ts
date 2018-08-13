import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImpactComponent } from './impact/impact.component';

const impactRoutes: Routes = [
  {
    path: '',
    component: ImpactComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(impactRoutes)],
  exports: [RouterModule]
})
export class ImpactRoutingModule {}
