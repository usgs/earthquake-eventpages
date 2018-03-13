import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { MetadataService } from '../../core/metadata.service';

@Component({
  selector: 'shakemap-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public metadata: any = null;
  public objKeys: any = Object.keys;
  public isNaN: any = isNaN;

  public name_order = {
    'event_information': ['event_description', 'event_id', 'magnitude',
                            'depth', 'longitude', 'latitude', 'origin_time',
                            'src_mech', 'location', 'fault_ref', 'seismic_stations',
                            'intensity_observations'],
    'ground_motions': ['intensity', 'mmi', 'MMI', 'pga', 'PGA', 'pgv',
                          'PGV', 'SA(0.3)', 'psa03', 'SA(1.0)', 'psa10',
                          'SA(3.0)', 'psa30', 'bias'],
    'map_information': ['grid_span', 'grid_spacing', 'grid_points', 'min', 'max'],
    'uncertainty': ['mean_uncertainty_ratio', 'grade', 'total_flagged_mi',
                      'total_flagged_pgm'],
    'ground_motion_modules': ['gmpe', 'ipe', 'gmice', 'igmice', 'ccf',
                                'directivity', 'basin_correction'],
    'shakemap_versions': ['shakemap_revision', 'shakemap_revision_id', 'map_version',
                            'process_time'],
    'miscellaneous': ['bias_max_mag', 'bias_max_range', 'bias_log_amp',
                        'bias_max_bias', 'bias_min_bias', 'bias_min_stations',
                        'bias_norm', 'median_dist', 'outlier_deviation_level',
                        'outlier_max_mag'],
    'roi': ['gm', 'intensity'],
    'site_response': ['vs30default', 'site_correction']
  };

  public names: any = {
    'event_information': {
      'location': 'Location',
      'longitude': 'Longitude',
      'seismic_stations': 'Number of Seismic Stations',
      'magnitude': 'Magnitude',
      'depth': 'Depth',
      'event_id': 'ID',
      'event_description': 'Description', 'origin_time': 'Origin Time',
      'latitude': 'Latitude',
      'fault_ref': 'Fault References',
      'src_mech': 'Mechanism Source',
      'intensity_observations': 'Number of DYFI Stations'
    },
    'ground_motions': {
      'PGA': 'PGA (%g)',
      'PGV': 'PGV (cm/s)',
      'pga': 'PGA (%g)',
      'pgv': 'PGV (cm/s)',
      'SA(0.3)': 'PSA03',
      'SA(1.0)': 'PSA10',
      'SA(3.0)': 'PSA30',
      'psa03': 'PSA03',
      'psa10': 'PSA10',
      'psa30': 'PSA30',
      'bias': 'Bias',
      'MMI': 'Intensity'
    },
    'map_information': {
        'grid_spacing': 'Grid spacing',
        'grid_points': 'Number of points',
        'grid_span': 'Span',
        'min': 'Min',
        'max': 'Max'
      },
    'uncertainty': {
        'total_flagged_mi': 'Flagged seismic stations',
        'grade': 'Empirical ShakeMap grade',
        'total_flagged_pgm': 'Flagged DYFI stations',
        'mean_uncertainty_ratio': 'Mean of map uncertainty'
      },
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

  constructor(public mdService: MetadataService,
              public eventService: EventService) { }

  ngOnInit() {
    this.subs.add(this.mdService.metadata.subscribe((metadata) => {
      this.onMetadata(metadata);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  /**
   * New product, get new station list
   *
   * @param product shakemap product
   */
  onProduct(product) {
    this.mdService.getMetadata(product);
  }

  /**
   * New stations
   *
   * @param stations station list json
   */
  onMetadata(metadata) {
    this.metadata = metadata;
  }

  /**
   * Unsubscribe from all existing subs when
   * the component is destroyed
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
