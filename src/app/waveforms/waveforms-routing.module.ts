import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaveformsComponent } from './waveforms/waveforms.component';

const waveformRoutes: Routes = [
  {
    component: WaveformsComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(waveformRoutes)]
})
export class WaveformsRoutingModule {}
