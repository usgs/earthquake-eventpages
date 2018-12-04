import { Pipe, PipeTransform } from '@angular/core';

import * as L from 'leaflet';

@Pipe({
  name: 'shakeAlertMapOverlays'
})
export class ShakeAlertMapOverlaysPipe implements PipeTransform {
  /**
   * Get shake alert map leaflet overlay
   *
   * @param alert
   *      The alert features array
   */

  transform(alert: any): any {
    const overlays = [];

    if (alert.features) {
      alert.features.forEach(feature => {
        feature.enabled = true;
        console.log('feature: ', feature);
        let layer;
        if (feature.geometry.type === 'Point') {
          layer = L.marker(feature.geometry.coordinates, {});
        }
        if (feature.geometry.type === 'Polygon') {
          layer = L.polyline(feature.geometry.coordinates, {});
        }
        overlays.push(layer);
      });
    }
    console.log('overlays: ', overlays);
    return overlays;
  }
}
