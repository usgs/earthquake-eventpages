import { ShakemapMapOverlaysPipe } from './shakemap-map-overlays.pipe';
import { Event } from '../event';

describe('ShakemapMapOverlaysPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ShakemapMapOverlaysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
