import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { WaveformService } from './waveform.service';
import { WaveformsRoutingModule } from './waveforms-routing.module';
import { WaveformsComponent } from './waveforms/waveforms.component';

@NgModule({
  declarations: [WaveformsComponent],
  imports: [CommonModule, SharedModule, WaveformsRoutingModule],
  providers: [WaveformService]
})
export class WaveformsModule {}
