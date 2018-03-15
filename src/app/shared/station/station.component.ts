import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {
  @Input() station: any;
  public channelsColumns = ['name', 'pga', 'pgv', 'psa03', 'psa10', 'psa30'];

  constructor() {}

   ngOnInit() {

   }

  /**
   * Amplitudes associated with each station are stored as an array.
   * This will grab an amplitude of a specific metric
   *
   * @param name string name of metric: pga, pgv, psa03, psa10, psa30
   *
   * @param amps array of amplitudes from station
   */
  getAmp(name: string, amps: any[]) {

    // dictionary of aliases for names that have changed in different
    // ShakeMap versions
    const tryNames = {
      'psa03': ['psa03', 'PSA03', 'psa(0.3)', 'PSA(0.3)'],
      'psa10': ['psa10', 'PSA10', 'psa(1.0)', 'PSA(1.0)'],
      'psa30': ['psa30', 'PSA30', 'psa(3.0)', 'PSA(3.0)']
    };

    for (const amp of amps) {
      if (amp['name'] === name || (
            tryNames[name] &&
            (tryNames[name].indexOf(amp['name']) > -1))) {

        // The name of this amplitude is matched (possibly by an alias)
        return amp;
      }
    }
    return {'value': null};
  }

}
