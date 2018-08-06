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
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent {

  @Input()
  bins: Array<any> = [
    {
      color: '#27a83c',
      text: 'Little to no',
      min: 0,
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

  @Input()
  title: String = 'Alert Bar Title';

  @Input()
  units: String = 'km²';

  @Input()
  value: number;
}
