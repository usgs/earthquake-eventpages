import { Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

/**
 * Processing subcomponent which shows different processing tables such as
 * ground motion, misc, shakemap version, site response, and ROI information
 * after user selects the 'metadata' tab from the main shakemap component
 *
 * @param smProcessing
 *     Shakemap processing data
 */
@Component({
  selector: 'shakemap-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent {
  readonly names = {
    ground_motion_modules: {
      basin_correction: 'Basin',
      gmpe: 'GMPE',
      directivity: 'Directivity',
      gmice: 'GMICE',
      ipe: 'IPE',
      ccf: 'CCF',
      igmice: 'IGMICE'
    },
    roi: {
      gm: 'Ground Motion',
      intensity: 'Intensity'
    }
  };
  readonly abbreviations = {
    gmpe: 'Ground Motion Prediction Equation',
    gmice: 'Ground Motion Intensity Conversion Equation',
    ipe: 'Intensity Prediction Equation',
    igmice: 'Inverse Ground Motion Intensity Conversion Equation'
  };
  readonly headers = {
    groundMotionModules: ['type', 'module', 'reference'],
    roi: ['type', 'roi', 'observation_decay']
  };

  @Input()
  smProcessing: any;

  constructor(public formatter: FormatterService) {}
}
