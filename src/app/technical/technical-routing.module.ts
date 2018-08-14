import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TechnicalComponent } from './technical/technical.component';

const technicalRoutes: Routes = [
  {
    component: TechnicalComponent,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(technicalRoutes)]
})
export class TechnicalRoutingModule {}
