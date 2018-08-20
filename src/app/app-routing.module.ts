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
    pathMatch: 'full',
    redirectTo: 'unknown'
  },
  {
    children: [
      {
        loadChildren: './tell-us/tell-us.module#TellUsModule',
        path: ''
      }
    ],
    component: UnknownEventPageComponent,
    path: 'unknown'
  },
  {
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'executive'
      },
      {
        component: ExecutiveComponent,
        path: 'executive'
      },
      {
        component: MapComponent,
        path: 'map'
      },
      {
        component: RegionInfoComponent,
        path: 'region-info'
      },
      {
        loadChildren: './impact/impact.module#ImpactModule',
        path: 'impact'
      },
      {
        loadChildren: './tell-us/tell-us.module#TellUsModule',
        path: 'tellus'
      },
      {
        loadChildren: './shakemap/shakemap.module#ShakemapModule',
        path: 'shakemap'
      },
      {
        loadChildren: './dyfi/dyfi.module#DyfiModule',
        path: 'dyfi'
      },
      {
        loadChildren: './pager/pager.module#PagerModule',
        path: 'pager'
      },
      {
        loadChildren:
          './ground-failure/ground-failure.module#GroundFailureModule',
        path: 'ground-failure'
      },
      {
        loadChildren: './technical/technical.module#TechnicalModule',
        path: 'technical'
      },
      {
        loadChildren: './origin/origin.module#OriginModule',
        path: 'origin'
      },
      {
        loadChildren: './moment-tensor/moment-tensor.module#MomentTensorModule',
        path: 'moment-tensor'
      },
      {
        loadChildren:
          './focal-mechanism/focal-mechanism.module#FocalMechanismModule',
        path: 'focal-mechanism'
      },
      {
        loadChildren: './oaf/oaf.module#OafModule',
        path: 'oaf'
      },
      {
        loadChildren: './finite-fault/finite-fault.module#FiniteFaultModule',
        path: 'finite-fault'
      },
      {
        loadChildren: './waveforms/waveforms.module#WaveformsModule',
        path: 'waveforms'
      }
    ],
    component: EventPageComponent,
    path: ':eventid'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })]
})
export class AppRoutingModule {}
