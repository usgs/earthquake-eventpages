import { Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

/**
 * Output subcomponent, shows the output data table when the user selects the
 * 'metadata' tab from the main shakemap component
 *
 * @param smOutput
 *     The shakemap output data table for metadata
 */
@Component({
  selector: 'shakemap-output',
  styleUrls: ['./output.component.scss'],
  templateUrl: './output.component.html'
})
export class OutputComponent {
  readonly abbreviations = {
    PGA: 'Peak Ground Acceleration',
    pga: 'Percent of Gravitational Acceleration',
    PGV: 'Peak Ground Velocity',
    pgv: 'Peak Ground Velocity',
    psa03: 'Spectral acceleration at 0.3 s',
    psa10: 'Spectral acceleration at 1.0 s',
    psa30: 'Spectral acceleration at 1.0 s',
    'SA(0.3)': 'Spectral acceleration at 0.3 s',
    'SA(1.0)': 'Spectral acceleration at 1.0 s',
    'SA(3.0)': 'Spectral acceleration at 3.0 s'
  };

  readonly headers = {
    groundMotions: ['type', 'max', 'max_on_land', 'bias'],
    mapInformation: ['type', 'lat', 'lon']
  };

  readonly names = {
    groundMotions: {
      bias: 'Bias',
      intensity: 'Intensity',
      MMI: 'Intensity',
      mmi: 'Intensity',
      PGA: 'PGA',
      pga: 'PGA',
      PGV: 'PGV',
      pgv: 'PGV',
      psa03: 'SA(0.3 s)',
      psa10: 'SA(1.0 s)',
      psa30: 'SA(3.0 s)',
      'SA(0.3)': 'SA(0.3 s)',
      'SA(1.0)': 'SA(1.0 s)',
      'SA(3.0)': 'SA(3.0 s)'
    },
    mapInformation: {
      grid_points: 'Number of points',
      grid_spacing: 'Grid spacing',
      grid_span: 'Span',
      max: 'Max',
      min: 'Min'
    }
  };

  @Input()
  smOutput: any;

  constructor(public formatter: FormatterService) {}
}
