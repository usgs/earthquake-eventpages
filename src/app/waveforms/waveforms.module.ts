import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';
import { WaveformService } from './waveform.service';
import { WaveformsRoutingModule } from './waveforms-routing.module';
import { WaveformsComponent } from './waveforms/waveforms.component';

@NgModule({
  imports: [CommonModule, WaveformsRoutingModule],
  declarations: [WaveformsComponent],
  providers: [WaveformService]
})
export class WaveformsModule {}
