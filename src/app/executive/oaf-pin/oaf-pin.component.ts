import { Component, Input } from '@angular/core';


/**
 * Aftershock Forecast Pin
 *
 * @param product
 *     oaf product
 */
@Component({
  selector: 'executive-oaf-pin',
  templateUrl: './oaf-pin.component.html',
  styleUrls: ['./oaf-pin.component.scss']
})
export class OafPinComponent {

  public link = '../oaf';
  public title = 'Aftershock Forecast';
  public type = 'oaf';

  @Input() product: any;

}
