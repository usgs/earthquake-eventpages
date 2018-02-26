import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TechnicalComponent } from './technical/technical.component';


const technicalRoutes: Routes = [
  {
    path: '',
    component: TechnicalComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(technicalRoutes)
  ],
  exports: [
    RouterModule
  ]
})


export class TechnicalRoutingModule { }
