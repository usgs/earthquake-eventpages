import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventPageComponent } from './event-page/event-page/event-page.component';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page/unknown-event-page.component';

import { ExecutiveComponent } from './executive/executive/executive.component';
import { RegionInfoComponent } from './region-info/region-info/region-info.component';
import { MapComponent } from './map/map/map.component';

const appRoutes = [
  {
    path: '',
    redirectTo: 'unknown',
    pathMatch: 'full'
  },
  {
    path: 'unknown',
    component: UnknownEventPageComponent,
    children: [
      {
        path: '',
        loadChildren: './tell-us/tell-us.module#TellUsModule'
      }
    ]
  },
  {
    path: ':eventid',
    component: EventPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'executive'
      },
      {
        path: 'executive',
        component: ExecutiveComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'region-info',
        component: RegionInfoComponent
      },
      {
        path: 'impact',
        loadChildren: './impact/impact.module#ImpactModule'
      },
      {
        path: 'tellus',
        loadChildren: './tell-us/tell-us.module#TellUsModule'
      },
      {
        path: 'shakemap',
        loadChildren: './shakemap/shakemap.module#ShakemapModule'
      },
      {
        path: 'pager',
        loadChildren: './pager/pager.module#PagerModule'
      },
      {
        path: 'ground-failure',
        loadChildren: './ground-failure/ground-failure.module#GroundFailureModule'
      },
      {
        path: 'technical',
        loadChildren: './technical/technical.module#TechnicalModule'
      },
      {
        path: 'origin',
        loadChildren: './origin/origin.module#OriginModule'
      },
      {
        path: 'moment-tensor',
        loadChildren: './moment-tensor/moment-tensor.module#MomentTensorModule'
      },
      {
        path: 'focal-mechanism',
        loadChildren: './focal-mechanism/focal-mechanism.module#FocalMechanismModule'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
