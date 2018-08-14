import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { GroundFailureComponent } from './ground-failure/ground-failure.component';
import { SummaryComponent } from './summary/summary.component';

const groundFailureRoutes: Routes = [
  {
    children: [
      {
        component: SummaryComponent,
        path: 'summary'
      },
      {
        component: AboutComponent,
        path: 'about'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'summary'
      }
    ],
    component: GroundFailureComponent,
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(groundFailureRoutes)]
})
export class GroundFailureRoutingModule {}
