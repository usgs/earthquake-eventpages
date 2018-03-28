import { Component } from '@angular/core';

import { HistoricSeismicityOverlay } from '../../shared/map-overlay/historic-seismicity-overlay';
import { MapComponent as SharedMapComponent } from '../../shared/map/map.component';
import { Overlay } from '../../shared/map-overlay/overlay';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private overlays: Array<Overlay> = [];

  constructor () {
    const layer = new HistoricSeismicityOverlay();
    layer.enabled = false;
    this.overlays.push(layer);
  }
}
