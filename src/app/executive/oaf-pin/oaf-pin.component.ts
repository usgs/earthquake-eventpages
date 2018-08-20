import { Component, Input } from '@angular/core';

/**
 * Aftershock Forecast Pin
 *
 * @param product
 *     oaf product
 */
@Component({
  selector: 'executive-oaf-pin',
  styleUrls: ['./oaf-pin.component.scss'],
  templateUrl: './oaf-pin.component.html'
})
export class OafPinComponent {
  link = '../oaf';
  @Input()
  product: any;
  title = 'Aftershock Forecast';
  type = 'oaf';
}
