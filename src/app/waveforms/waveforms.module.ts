import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageModule } from '../product-page/product-page.module';
import { SharedModule } from '../shared/shared.module';
import { WaveformsComponent } from './waveforms/waveforms.component';
import { WaveformsRoutingModule } from './waveforms-routing.module';
import {WaveformService} from './waveform.service';

@NgModule({
  imports: [
    CommonModule,
    WaveformsRoutingModule
  ],
  declarations: [WaveformsComponent],
  providers: [WaveformService]
})
export class WaveformsModule { }
