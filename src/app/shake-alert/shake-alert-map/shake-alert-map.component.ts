import { Component, Input } from '@angular/core';

/**
 * Presentational shake-alert-map component to display leaflet map
 */
@Component({
  selector: 'shake-alert-map',
  styleUrls: ['./shake-alert-map.component.scss'],
  templateUrl: './shake-alert-map.component.html'
})
export class ShakeAlertMapComponent {
  @Input() alert;
  @Input() caption;
}
