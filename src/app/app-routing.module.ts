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
    component: UnknownEventPageComponent
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
        path: 'origin',
        loadChildren: './origin/origin.module#OriginModule'
      },
      {
        path: 'shakemap',
        loadChildren: './shakemap/shakemap.module#ShakemapModule'
      },
      {
        path: 'impact',
        loadChildren: './impact/impact.module#ImpactModule'
      },
      {
        path: 'technical',
        loadChildren: './technical/technical.module#TechnicalModule'
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
