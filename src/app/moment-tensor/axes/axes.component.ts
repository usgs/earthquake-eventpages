import { Component, OnInit, Input } from '@angular/core';
import { Tensor } from '../../shared/beachball/tensor';
import { Beachball } from '../../shared/beachball/beachball';

@Component({
  selector: 'moment-tensor-axes',
  templateUrl: './axes.component.html',
  styleUrls: ['./axes.component.css']
})
export class AxesComponent implements OnInit {

  public columnsToDisplay = [
    'axis',
    'value',
    'plunge',
    'azimuth'
  ];

  public round = Math.round;

  @Input() tensor: Tensor;

  constructor() { }

  ngOnInit() {
  }

  getAxes (tensor: Tensor) {
    if (!tensor) {
      return [];
    }

    return [tensor.T, tensor.N, tensor.P].map((axis) => {
      let azimuth,
          plunge,
          value;

      azimuth = (Math.PI / 2) - axis.vector.azimuth();
      plunge = axis.vector.plunge();
      value = axis.eigenvalue;

      // fix up plunge/azimuth
      if (plunge < 0) {
        azimuth += Math.PI;
        plunge = plunge * -1;
      }
      azimuth = Beachball.zeroToTwoPi(azimuth);

      return {
        azimuth: azimuth * 180 / Math.PI,
        exponent: tensor.exponent,
        name: axis.name,
        plunge: plunge * 180 / Math.PI,
        units: tensor.units,
        value: value / tensor.scale
      };
    });
  }

}
