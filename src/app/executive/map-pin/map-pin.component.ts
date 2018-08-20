import { Component, Input } from '@angular/core';

/**
 * Interactive Map Pin
 *
 * @param event
 *     Event object
 */
@Component({
  selector: 'executive-map-pin',
  styleUrls: ['./map-pin.component.scss'],
  templateUrl: './map-pin.component.html'
})
export class MapPinComponent {
  @Input()
  event: Event;
  link = '../map';
  title = 'Interactive Map';
}
