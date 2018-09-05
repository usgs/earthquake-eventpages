import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { GeoserveOutputModule } from 'hazdev-ng-geoserve-output';

import { RegionInfoComponent } from './region-info/region-info.component';

@NgModule({
  declarations: [RegionInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

    GeoserveOutputModule.forRoot()
  ]
})
export class RegionInfoModule {}
