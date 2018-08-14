import { Component } from '@angular/core';

/**
 * Tsunami Pin
 */
@Component({
  selector: 'executive-tsunami-pin',
  styleUrls: ['./tsunami-pin.component.scss'],
  templateUrl: './tsunami-pin.component.html'
})
export class TsunamiPinComponent {
  footer = 'NOAA';
  href = 'https://www.tsunami.gov/';
  title = 'Tsunami';
}
