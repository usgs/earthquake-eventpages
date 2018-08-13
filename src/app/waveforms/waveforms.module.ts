import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WaveformService } from './waveform.service';
import { WaveformsRoutingModule } from './waveforms-routing.module';
import { WaveformsComponent } from './waveforms/waveforms.component';

@NgModule({
  imports: [CommonModule, WaveformsRoutingModule],
  declarations: [WaveformsComponent],
  providers: [WaveformService]
})
export class WaveformsModule {}
