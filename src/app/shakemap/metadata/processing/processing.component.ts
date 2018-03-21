import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shakemap-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public names: any = {
    'ground_motion_modules': {
        'basin_correction': 'Basin',
        'gmpe': 'GMPE',
        'directivity': 'Directivity',
        'gmice': 'GMICE',
        'ipe': 'IPE',
        'ccf': 'CCF',
        'igmice': 'IGMICE'
      },
    'roi': {
      'gm': 'Ground Motion',
      'intensity': 'Intensity'
    }
  };

  public abbreviations = {
        'gmpe': 'Ground Motion Prediction Equation',
        'gmice': 'Ground Motion Intensity Conversion Equation',
        'ipe': 'Intensity Prediction Equation',
        'igmice': 'Inverse Ground Motion Intensity Conversion Equation'
  };

  public headers: any = {
    'groundMotionModules': ['type', 'module', 'reference'],
    'roi': ['type', 'roi', 'observation_decay']
  };

  constructor () { }
  @Input() smProcessing: any;

  ngOnInit () {
  }

}
