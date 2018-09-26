import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ground-failure-population-alert',
  styleUrls: ['./population-alert.component.scss'],
  templateUrl: './population-alert.component.html'
})
export class PopulationAlertComponent {
  @Input()
  alert: 'green' | 'yellow' | 'orange' | 'red';
  landslideBins = [
    {
      color: '#27a83c',
      max: 100,
      min: 10,
      text: 'Little or no'
    },
    {
      color: '#e5e514',
      max: 1000,
      min: 100,
      text: 'Limited'
    },
    {
      color: '#f0a216',
      max: 10000,
      min: 1000,
      text: 'Significant'
    },
    {
      color: '#ba2d1a',
      max: 100000,
      min: 10000,
      text: 'Extensive'
    }
  ];

  liquefactionBins = [
    {
      color: '#27a83c',
      max: 1000,
      min: 100,
      text: 'Little or no'
    },
    {
      color: '#e5e514',
      max: 10000,
      min: 1000,
      text: 'Limited'
    },
    {
      color: '#f0a216',
      max: 100000,
      min: 10000,
      text: 'Significant'
    },
    {
      color: '#ba2d1a',
      max: 1000000,
      min: 100000,
      text: 'Extensive'
    }
  ];

  @Input()
  title: String = 'Estimated Population Exposure';

  @Input()
  type: 'landslide' | 'liquefaction';

  @Input()
  units: String = '';

  @Input()
  value: number;
}
