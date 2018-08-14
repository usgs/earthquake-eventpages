import { Component } from '@angular/core';

/**
 * Tsunami Pin
 */
@Component({
  selector: 'executive-tsunami-pin',
  templateUrl: './tsunami-pin.component.html',
  styleUrls: ['./tsunami-pin.component.scss']
})
export class TsunamiPinComponent {
  href = 'https://www.tsunami.gov/';
  title = 'Tsunami';
  footer = 'NOAA';
}
