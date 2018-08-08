import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import {
  GroundFailureComponent
} from './ground-failure/ground-failure.component';
import { SummaryComponent } from './summary/summary.component';


const groundFailureRoutes: Routes = [
  {
    path: '',
    component: GroundFailureComponent,
    children: [
      {
        path: 'summary',
        component: SummaryComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'summary'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(groundFailureRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GroundFailureRoutingModule { }
