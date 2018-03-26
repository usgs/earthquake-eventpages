import { Component, OnInit, Input } from '@angular/core';
import { FormatterService } from '../../../core/formatter.service';

@Component({
  selector: 'shakemap-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {

  public names = {
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

  public headers = {
    'groundMotionModules': ['type', 'module', 'reference'],
    'roi': ['type', 'roi', 'observation_decay']
  };

  constructor (public formatter: FormatterService) { }
  @Input() smProcessing: any;

  ngOnInit () {
  }

}
