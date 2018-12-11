import { ShakeAlertOverlaysPipe } from './shake-alert-map-overlays.pipe';

describe('ShakeAlertOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new ShakeAlertOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns empty array with null input', () => {
    const pipe = new ShakeAlertOverlaysPipe();
    const overlays = pipe.transform(null);
    expect(overlays).toBeNull();
  });

  it('returns empty array without features array', () => {
    const alert = {
      noFeatures: {}
    };
    const pipe = new ShakeAlertOverlaysPipe();
    const overlays = pipe.transform(alert);
    expect(overlays.length).toEqual(0);
  });

  it('returns array of length 1 with 1 good feature', () => {
    const alert = {
      features: [
        { geometry: { coordinates: [0, 0], type: 'Point' }, type: 'Feature' }
      ]
    };
    const pipe = new ShakeAlertOverlaysPipe();
    const overlays = pipe.transform(alert);
    expect(overlays.length).toEqual(1);
  });
});
