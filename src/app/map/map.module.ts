import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { SharedModule } from '@shared/shared.module';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [CommonModule, MatButtonModule, SharedModule]
})
export class MapModule {}
