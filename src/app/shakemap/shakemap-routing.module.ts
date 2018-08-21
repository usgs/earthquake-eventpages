import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntensityComponent } from './intensity/intensity.component';
import { MetadataComponent } from './metadata/metadata.component';
import { PgaComponent } from './pga/pga.component';
import { PgvComponent } from './pgv/pgv.component';
import { PsaComponent } from './psa/psa.component';
import { ShakemapComponent } from './shakemap/shakemap.component';
import { StationListComponent } from './station-list/station-list.component';

const shakemapRoutes: Routes = [
  {
    children: [
      {
        component: IntensityComponent,
        path: 'intensity'
      },
      {
        component: PgaComponent,
        path: 'pga'
      },
      {
        component: PgvComponent,
        path: 'pgv'
      },
      {
        component: PsaComponent,
        path: 'psa'
      },
      {
        component: StationListComponent,
        path: 'stations'
      },
      {
        component: MetadataComponent,
        path: 'metadata'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'intensity'
      }
    ],
    component: ShakemapComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(shakemapRoutes)]
})
export class ShakemapRoutingModule {}
