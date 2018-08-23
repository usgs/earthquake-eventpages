import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Tensor } from '@shared/beachball/tensor';
import { Beachball } from '@shared/beachball/beachball';

/**
 * Display Moment Tensor beachball diagram
 *
 * @param tensor
 *     tensor object
 *
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'moment-tensor-axes',
  styleUrls: ['./axes.component.scss'],
  templateUrl: './axes.component.html'
})
export class AxesComponent {
  columnsToDisplay = ['axis', 'value', 'plunge', 'azimuth'];

  @Input()
  tensor: Tensor;

  /**
   * Get the fault plane solution axes
   *
   * @param tensor
   *     tensor object
   */
  getAxes(tensor: Tensor) {
    if (!tensor) {
      return [];
    }

    return [tensor.T, tensor.N, tensor.P].map(axis => {
      let azimuth, plunge, value;

      azimuth = Math.PI / 2 - axis.vector.azimuth();
      plunge = axis.vector.plunge();
      value = axis.eigenvalue;

      // fix up plunge/azimuth
      if (plunge < 0) {
        azimuth += Math.PI;
        plunge = plunge * -1;
      }
      azimuth = Beachball.zeroToTwoPi(azimuth);

      return {
        azimuth: (azimuth * 180) / Math.PI,
        exponent: tensor.exponent,
        name: axis.name,
        plunge: (plunge * 180) / Math.PI,
        units: tensor.units,
        value: value / tensor.scale
      };
    });
  }
}
