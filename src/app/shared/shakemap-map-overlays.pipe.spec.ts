import { ShakemapMapOverlaysPipe } from './shakemap-map-overlays.pipe';
import { Event } from '../event';

describe('ShakemapMapOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new ShakemapMapOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  it('handles null event', () => {
    const pipe = new ShakemapMapOverlaysPipe();
    const overlays = pipe.transform(null);

    expect(overlays).toEqual([]);
  });

  it('handles event', () => {
    const pipe = new ShakemapMapOverlaysPipe();
    const overlays = pipe.transform(new Event(null));

    expect(overlays).toEqual([]);
  });
});
