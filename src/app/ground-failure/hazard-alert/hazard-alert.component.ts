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
  templateUrl: './hazard-alert.component.html',
  styleUrls: ['./hazard-alert.component.scss']
})
export class HazardAlertComponent {

  public landslideBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 0.1,
      max: 1
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 1,
      max: 10
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 10,
      max: 100
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 100,
      max: 1000
    }
  ];

  public liquefactionBins = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 1,
      max: 10
    },
    {
      color: '#e5e514',
      text: 'Limited',
      min: 10,
      max: 100
    },
    {
      color: '#f0a216',
      text: 'Significant',
      min: 100,
      max: 1000
    },
    {
      color: '#ba2d1a',
      text: 'Extensive',
      min: 1000,
      max: 10000
    }
  ];

  @Input()
  alert: 'green' | 'yellow' | 'orange' | 'red';

  @Input()
  title: String = 'Estimated Area Exposed to Hazard';

  @Input()
  type: 'landslide' | 'liquefaction';

  @Input()
  units: String  = 'km²';

  @Input()
  value: number;

}
