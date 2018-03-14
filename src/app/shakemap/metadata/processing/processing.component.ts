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
    'shakemap_versions': {
        'map_version': 'Map',
        'shakemap_revision_id': 'GitHub commit',
        'shakemap_revision': 'Code',
        'process_time': 'Date'
      },
    'miscellaneous': {
        'bias_max_mag': 'Max magnitude to compute bias',
        'bias_max_range': 'Maximum distance to include station in bias',
        'bias_log_amp': 'Use log amp to compute bias',
        'bias_max_bias': 'Max allowed bias',
        'bias_min_bias': 'Min allowed bias',
        'bias_min_stations': 'Min # of stations necessary to compute bias',
        'bias_norm': 'Norm of the bias',
        'median_dist': 'Median distance used',
        'outlier_deviation_level': 'Outlier level (# of std dev)',
        'outlier_max_mag': 'Max magnitude to flag outliers',
      },
    'roi': {
      'gm': 'Ground Motion',
      'intensity': 'Intensity'
    },
    'site_response': {
      'site_correction': 'Site correction applied',
      'vs30default': 'Reference rock Vs30'
    }
  };

  public headers: any = {
    'groundMotionModules': ['type', 'module', 'reference'],
    'miscellaneous': ['bias_max_mag', 'bias_max_range', 'bias_log_amp',
                        'bias_max_bias', 'bias_min_bias', 'bias_min_stations',
                        'bias_norm', 'median_dist', 'outlier_deviation_level',
                        'outlier_max_mag'],
    'shakemap_versions': ['shakemap_revision', 'shakemap_revision_id', 'map_version',
                            'process_time'],
    'site_response': ['vs30default', 'site_correction'],
    'roi': ['type', 'roi', 'observation_decay']
  }

  constructor() { }
  @Input() smProcessing: any;

  ngOnInit() {
  }

}
