import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shakemap-processing',
  styleUrls: ['./processing.component.scss', '../metadata.component.scss'],
  templateUrl: './processing.component.html'
})
export class ProcessingComponent {
  readonly abbreviations = {
    gmice: 'Ground Motion Intensity Conversion Equation',
    gmpe: 'Ground Motion Prediction Equation',
    igmice: 'Inverse Ground Motion Intensity Conversion Equation',
    ipe: 'Intensity Prediction Equation'
  };
  readonly headers = {
    groundMotionModules: ['type', 'module', 'reference'],
    history: ['version', 'network', 'time', 'comment'],
    roi: ['type', 'roi', 'observation_decay']
  };
  readonly names = {
    ground_motion_modules: {
      basin_correction: 'Basin',
      ccf: 'CCF',
      directivity: 'Directivity',
      gmice: 'GMICE',
      gmpe: 'GMPE',
      igmice: 'IGMICE',
      ipe: 'IPE'
    },
    roi: {
      gm: 'Ground Motion',
      intensity: 'Intensity'
    }
  };

  @Input()
  smProcessing: any;

  constructor(public formatter: FormatterService) {}
}
