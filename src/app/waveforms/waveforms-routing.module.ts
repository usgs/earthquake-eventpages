import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WaveformsComponent } from './waveforms/waveforms.component';

const waveformRoutes: Routes = [
  {
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: '',
    component: WaveformsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(waveformRoutes)],
  exports: [RouterModule]
})
export class WaveformsRoutingModule {}
