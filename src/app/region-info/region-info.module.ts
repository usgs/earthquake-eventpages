import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  GeoserveCoreModule,
  GeoserveOutputModule
} from 'earthquake-geoserve-ui';

import { SharedModule } from '@shared/shared.module';
import { RegionInfoComponent } from './region-info/region-info.component';

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
export class RegionInfoModule {}
