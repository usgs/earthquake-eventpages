import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';
import { OafComponent } from './oaf/oaf.component';


const oafRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: OafComponent,
    children: [
      {
        path: 'commentary',
        component: CommentaryComponent
      },
      {
        path: 'forecast',
        component: ForecastComponent
      },
      {
        path: 'model',
        component: ModelComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'commentary'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(oafRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class OafRoutingModule { }
