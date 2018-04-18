import { GroundFailureLandslideOverlay } from './ground-failure-landslide-overlay';

import * as L from 'leaflet';


describe('GroundFailureLandslideOverlay', () => {
  it('can be created', () => {
    expect(new GroundFailureLandslideOverlay()).toBeTruthy();
  });
});
