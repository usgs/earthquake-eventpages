import * as L from 'leaflet';

import { EpicenterOverlay } from './epicenter-overlay';


describe('EpicenterOverlay', () => {
  it('can be created', () => {
    expect(new EpicenterOverlay(null)).toBeTruthy();
    expect(new EpicenterOverlay({})).toBeTruthy();
    expect(new EpicenterOverlay({properties: null})).toBeTruthy();
    expect(new EpicenterOverlay({properties: {}})).toBeTruthy();
    expect(new EpicenterOverlay(
        {properties: {latitude: 0, longitude: 0}})).toBeTruthy();
  });
});
