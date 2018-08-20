import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentaryComponent } from './commentary/commentary.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModelComponent } from './model/model.component';
import { OafComponent } from './oaf/oaf.component';

const oafRoutes: Routes = [
  {
    children: [
      {
        component: CommentaryComponent,
        path: 'commentary'
      },
      {
        component: ForecastComponent,
        path: 'forecast'
      },
      {
        component: ModelComponent,
        path: 'model'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'commentary'
      }
    ],
    component: OafComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(oafRoutes)]
})
export class OafRoutingModule {}
