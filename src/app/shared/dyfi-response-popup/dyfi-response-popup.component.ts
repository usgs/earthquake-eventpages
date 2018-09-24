import { Component, Input } from '@angular/core';

/**
 * Dyfi responses popup dumb component for use in dyfi response map overlays
 */
@Component({
  selector: 'dyfi-response-popup',
  styleUrls: ['./dyfi-response-popup.component.scss'],
  templateUrl: './dyfi-response-popup.component.html'
})
export class DyfiResponsePopupComponent {
  @Input()
  dist;
  @Input()
  intensity;
  @Input()
  mmi;
  @Input()
  name;
  @Input()
  nresp;
}
