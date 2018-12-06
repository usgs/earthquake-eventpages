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
    if (!alert) {
      return null;
    }
    const overlays = [];
    if (alert.features) {
      alert.features.forEach(feature => {
        if (
          feature.geometry &&
          feature.geometry.coordinates &&
          feature.geometry.type
        ) {
          let color = '#000';
          if (feature.properties && feature.properties.stroke) {
            color = feature.properties.stroke;
          }
          const layer = L.geoJSON(feature, {
            color: color
          });
          layer.enabled = 'true';
          overlays.push(layer);
        }
      });
    }
    return overlays;
  }
}
