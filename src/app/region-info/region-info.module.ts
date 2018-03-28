import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionInfoComponent } from './region-info/region-info.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [RegionInfoComponent]
})
export class RegionInfoModule { }
