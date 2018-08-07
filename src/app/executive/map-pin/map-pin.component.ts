import { Component, Input } from '@angular/core';

/**
 * Interactive Map Pin
 *
 * @param event
 *     Event object
 */
@Component({
  selector: 'executive-map-pin',
  templateUrl: './map-pin.component.html',
  styleUrls: ['./map-pin.component.scss']
})
export class MapPinComponent {

  link = '../map';
  title = 'Interactive Map';

  @Input() event: Event;

}
