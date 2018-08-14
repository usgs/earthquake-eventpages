import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [MapComponent],
  declarations: [MapComponent]
})
export class MapModule {}
