import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shakemap-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {
  public names: any = {
    'groundMotions': {
      'PGA': 'PGA',
      'PGV': 'PGV',
      'pga': 'PGA',
      'pgv': 'PGV',
      'SA(0.3)': 'PSA03',
      'SA(1.0)': 'PSA10',
      'SA(3.0)': 'PSA30',
      'psa03': 'PSA03',
      'psa10': 'PSA10',
      'psa30': 'PSA30',
      'bias': 'Bias',
      'MMI': 'Intensity',
      'mmi': 'Intensity',
      'intensity': 'Intensity'
    },
    'mapInformation': {
        'grid_spacing': 'Grid spacing',
        'grid_points': 'Number of points',
        'grid_span': 'Span',
        'min': 'Min',
        'max': 'Max'
      },
  };

  public headers: any = {
    'groundMotions': ['type', 'max', 'max_on_land', 'bias'],
    'mapInformation': ['type', 'lat', 'lon']
  };

  constructor() { }
  @Input() smOutput: any;

  ngOnInit() {
  }

}
