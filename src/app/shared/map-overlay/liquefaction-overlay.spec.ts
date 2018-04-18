import { LiquefactionOverlay } from './liquefaction-overlay';

import * as L from 'leaflet';


describe('LiquefactionOverlay', () => {
  it('can be created', () => {
    expect(new LiquefactionOverlay()).toBeTruthy();
  });
});
