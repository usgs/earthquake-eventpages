import { Component, Input } from '@angular/core';

/**
 * Display the "estimated area exposed" bins on ground-failure product page
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
 *     exposed area units
 *
 * @param value
 *     number of population exposed
 */
@Component({
  selector: 'ground-failure-hazard-alert',
  styleUrls: ['./hazard-alert.component.scss'],
  templateUrl: './hazard-alert.component.html'
})
export class HazardAlertComponent {
  @Input()
  alert: 'green' | 'yellow' | 'orange' | 'red';

  landslideBins = [
    {
      color: '#27a83c',
      max: 1,
      min: 0.1,
      text: 'Little to no'
    },
    {
      color: '#e5e514',
      max: 10,
      min: 1,
      text: 'Limited'
    },
    {
      color: '#f0a216',
      max: 100,
      min: 10,
      text: 'Significant'
    },
    {
      color: '#ba2d1a',
      max: 1000,
      min: 100,
      text: 'Extensive'
    }
  ];

  liquefactionBins = [
    {
      color: '#27a83c',
      max: 10,
      min: 1,
      text: 'Little to no'
    },
    {
      color: '#e5e514',
      max: 100,
      min: 10,
      text: 'Limited'
    },
    {
      color: '#f0a216',
      max: 1000,
      min: 100,
      text: 'Significant'
    },
    {
      color: '#ba2d1a',
      max: 10000,
      min: 1000,
      text: 'Extensive'
    }
  ];

  @Input()
  title: String = 'Estimated Area Exposed to Hazard';

  @Input()
  type: 'landslide' | 'liquefaction';

  @Input()
  units: String = 'km²';

  @Input()
  value: number;
}
