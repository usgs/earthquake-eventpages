import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

import { ShakeAlertOverlay } from './map-overlay/shake-alert-overlay';

@Pipe({
  name: 'shakeAlertOverlays'
})
export class ShakeAlertOverlaysPipe implements PipeTransform {
  /**
   * Get shake alert map leaflet overlay
   *
   * @param alert
   *      The alert features array
   */

  transform(alert: any): Array<L.Layer> {
    if (!alert) {
      return null;
    }
    const overlays = [];
    if (alert && alert.features) {
      overlays.push(new ShakeAlertOverlay(alert));
    }
    return overlays;
  }
}
