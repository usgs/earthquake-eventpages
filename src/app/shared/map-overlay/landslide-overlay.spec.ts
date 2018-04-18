import { LandslideOverlay } from './landslide-overlay';

import * as L from 'leaflet';


describe('LandslideOverlay', () => {
  it('can be created', () => {
    expect(new LandslideOverlay()).toBeTruthy();
  });
});
