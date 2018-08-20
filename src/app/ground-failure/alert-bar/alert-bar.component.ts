import { Component, Input } from '@angular/core';

/**
 * Generate alert bars for summary tab, on ground-failure product page
 *
 * @param bins
 *     bins to be plotted on alert bar
 *
 * @param title
 *     alert bar title/header
 *
 * @param units
 *     value units
 *
 * @param value
 *     value to be be plotted on alert bar
 *
 */
@Component({
  selector: 'ground-failure-alert-bar',
  styleUrls: ['./alert-bar.component.scss'],
  templateUrl: './alert-bar.component.html'
})
export class AlertBarComponent {
  @Input()
  bins: Array<any> = [
    {
      color: '#27a83c',
      max: 1,
      min: 0,
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

  @Input()
  title: String = 'Alert Bar Title';

  @Input()
  units: String = 'km²';

  @Input()
  value: number;
}
