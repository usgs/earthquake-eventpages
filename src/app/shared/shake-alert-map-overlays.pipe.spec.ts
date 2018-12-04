import { ShakeAlertMapOverlaysPipe } from './shake-alert-map-overlays.pipe';

describe('ShakeAlertMapOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new ShakeAlertMapOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns empty array with null input', () => {
    const pipe = new ShakeAlertMapOverlaysPipe();
    const overlays = pipe.transform(null);
    expect(overlays).toBeNull();
  });

  it('returns empty array without features array', () => {
    const alert = {
      noFeatures: {}
    };
    const pipe = new ShakeAlertMapOverlaysPipe();
    const overlays = pipe.transform(alert);
    expect(overlays.length).toEqual(0);
  });

  it('returns array of length 1 with 1 good feature', () => {
    const alert = {
      features: [
        { geometry: { coordinates: [0, 0], type: 'Point' }, type: 'Feature' },
        { nogeometry: null, type: 'Feature' },
        { nogeometry: null, type: 'Feature' },
        { geometry: { noocoordinates: null } }
      ]
    };
    const pipe = new ShakeAlertMapOverlaysPipe();
    const overlays = pipe.transform(alert);
    expect(overlays.length).toEqual(1);
  });
});
