import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MapComponent
  ],
  declarations: [
    MapComponent,
    InteractiveMapOverlaysPipe
  ]
})
export class MapModule { }
