import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventPageComponent } from './event-page/event-page/event-page.component';
import { UnknownEventPageComponent } from './unknown-event-page/unknown-event-page/unknown-event-page.component';

import { ExecutiveComponent } from './executive/executive/executive.component';
import { OriginComponent } from './origin/origin/origin.component';
import { RegionInfoComponent } from './region-info/region-info/region-info.component';

const appRoutes = [
  {
    path: 'unknown',
    component: UnknownEventPageComponent
  },
  {
    path: ':eventid',
    component: EventPageComponent,
    children: [
      {
        path: 'executive',
        component: ExecutiveComponent
      },
      {
        path: 'region-info',
        component: RegionInfoComponent
      },
      {
        path: 'origin',
        component: OriginComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'executive'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/unknown',
    pathMatch: 'full'
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
