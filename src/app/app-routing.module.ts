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
    redirectTo: 'unknown',
  },
  {
    children: [
      {
        loadChildren: () =>
          import('./not-found/not-found.module').then((m) => m.NotFoundModule),
        path: '',
      },
    ],
    component: UnknownEventPageComponent,
    path: 'unknown',
  },
  {
    children: [
      {
        loadChildren: () =>
          import('./tell-us/tell-us.module').then((m) => m.TellUsModule),
        path: '',
      },
    ],
    component: UnknownEventPageComponent,
    path: 'tellus',
  },
  {
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'executive',
      },
      {
        component: ExecutiveComponent,
        path: 'executive',
      },
      {
        component: MapComponent,
        path: 'map',
      },
      {
        component: RegionInfoComponent,
        path: 'region-info',
      },
      {
        loadChildren: () =>
          import('./impact/impact.module').then((m) => m.ImpactModule),
        path: 'impact',
      },
      {
        loadChildren: () =>
          import('./tell-us/tell-us.module').then((m) => m.TellUsModule),
        path: 'tellus',
      },
      {
        loadChildren: () =>
          import('./shakemap/shakemap.module').then((m) => m.ShakemapModule),
        path: 'shakemap',
      },
      {
        loadChildren: () =>
          import('./dyfi/dyfi.module').then((m) => m.DyfiModule),
        path: 'dyfi',
      },
      {
        loadChildren: () =>
          import('./pager/pager.module').then((m) => m.PagerModule),
        path: 'pager',
      },
      {
        loadChildren: () =>
          import('./ground-failure/ground-failure.module').then(
            (m) => m.GroundFailureModule
          ),
        path: 'ground-failure',
      },
      {
        loadChildren: () =>
          import('./technical/technical.module').then((m) => m.TechnicalModule),
        path: 'technical',
      },
      {
        loadChildren: () =>
          import('./origin/origin.module').then((m) => m.OriginModule),
        path: 'origin',
      },
      {
        loadChildren: () =>
          import('./moment-tensor/moment-tensor.module').then(
            (m) => m.MomentTensorModule
          ),
        path: 'moment-tensor',
      },
      {
        loadChildren: () =>
          import('./focal-mechanism/focal-mechanism.module').then(
            (m) => m.FocalMechanismModule
          ),
        path: 'focal-mechanism',
      },
      {
        loadChildren: () => import('./oaf/oaf.module').then((m) => m.OafModule),
        path: 'oaf',
      },
      {
        loadChildren: () =>
          import('./finite-fault/finite-fault.module').then(
            (m) => m.FiniteFaultModule
          ),
        path: 'finite-fault',
      },
      {
        loadChildren: () =>
          import('./waveforms/waveforms.module').then((m) => m.WaveformsModule),
        path: 'waveforms',
      },
      {
        loadChildren: () =>
          import('./shake-alert/shake-alert.module').then(
            (m) => m.ShakeAlertModule
          ),
        path: 'shake-alert',
      },
      {
        loadChildren: () =>
          import('./wildcard/wildcard.module').then((m) => m.WildcardModule),
        path: '**',
      },
    ],
    component: EventPageComponent,
    path: ':eventid',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: false })],
})
export class AppRoutingModule {}
