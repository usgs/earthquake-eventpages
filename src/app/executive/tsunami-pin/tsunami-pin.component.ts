import { Component, Input } from '@angular/core';

/**
 * Tsunami Pin
 */
@Component({
  selector: 'executive-tsunami-pin',
  templateUrl: './tsunami-pin.component.html',
  styleUrls: ['./tsunami-pin.component.scss']
})
export class TsunamiPinComponent {
  public href = 'https://www.tsunami.gov/';
  public title = 'Tsunami';
  public footer = 'NOAA';
}
