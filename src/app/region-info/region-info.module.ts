import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegionInfoComponent } from './region-info/region-info.component';
import { SharedModule } from '../shared/shared.module';

import { GeoserveCoreModule, GeoserveOutputModule } from 'earthquake-geoserve-ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

    GeoserveCoreModule.forRoot(),
    GeoserveOutputModule
  ],
  declarations: [RegionInfoComponent]
})
export class RegionInfoModule { }
