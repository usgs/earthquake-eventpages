import { EpicenterOverlay } from './epicenter-overlay';

import * as L from 'leaflet';


describe('EpicenterOverlay', () => {
  it('can be created', () => {
    expect(new EpicenterOverlay(null)).toBeTruthy();
  });

  it('uses product when defined', () => {
    const overlay = new EpicenterOverlay({
      properties: {
        latitude: '12',
        longitude: '34'
      }
    });

    expect(overlay.layer instanceof L.Marker).toBeTruthy();
    const latlng = overlay.layer.getLatLng();
    expect(latlng.lat).toBe(12);
    expect(latlng.lng).toBe(34);
  });
});
