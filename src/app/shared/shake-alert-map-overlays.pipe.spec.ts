import { ShakeAlertMapOverlaysPipe } from './shake-alert-map-overlays.pipe';

fdescribe('ShakeAlertMapOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new ShakeAlertMapOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns empty array with null input', () => {
    const pipe = new ShakeAlertMapOverlaysPipe();
    const overlays = pipe.transform(null);
    expect(overlays).toBeNull();
  });
});
