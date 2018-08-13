import { Component, Input } from '@angular/core';

/**
 * Display population exposure bins on ground-failure product page
 *
 * @param alert
 *     alert level (green | yellow | orange | red)
 *
 * @param title
 *     section header
 *
 * @param type
 *     type of ground failure (landslide | liquefaction)
 *
 * @param units
 *     population units
 *
 * @param value
 *     number of population exposed
 */
@Component({
  selector: 'ground-failure-population-alert',
  templateUrl: './population-alert.component.html',
  styleUrls: ['./population-alert.component.scss']
})
export class PopulationAlertComponent {
  landslideBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 10,
      max: 100
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 100,
      max: 1000
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 1000,
      max: 10000
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 10000,
      max: 100000
    }
  ];

  liquefactionBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 10,
      max: 1000
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 1000,
      max: 10000
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 10000,
      max: 100000
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 100000,
      max: 1000000
    }
  ];

  @Input()
  alert: 'green' | 'yellow' | 'orange' | 'red';

  @Input()
  title: String = 'Estimated Population Exposure';

  @Input()
  type: 'landslide' | 'liquefaction';

  @Input()
  units: String = '';

  @Input()
  value: number;
}
