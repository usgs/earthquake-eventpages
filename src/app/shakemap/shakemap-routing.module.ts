import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntensityComponent } from './intensity/intensity.component';
import { MetadataComponent } from './metadata/metadata.component';
import { PgaComponent } from './pga/pga.component';
import { PgvComponent } from './pgv/pgv.component';
import { PsaComponent } from './psa/psa.component';
import { ShakemapComponent } from './shakemap/shakemap.component';
import { StationListComponent } from './station-list/station-list.component';
import { UncertaintyComponent } from './uncertainty/uncertainty.component';

const shakemapRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: ShakemapComponent,
    children: [
      {
        path: 'intensity',
        component: IntensityComponent
      },
      {
        path: 'pga',
        component: PgaComponent
      },
      {
        path: 'pgv',
        component: PgvComponent
      },
      {
        path: 'psa',
        component: PsaComponent
      },
      {
        path: 'stations',
        component: StationListComponent
      },
      {
        path: 'metadata',
        component: MetadataComponent
      },
      {
        path: 'uncertainty',
        component: UncertaintyComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'intensity'
      }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(shakemapRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShakemapRoutingModule { }
