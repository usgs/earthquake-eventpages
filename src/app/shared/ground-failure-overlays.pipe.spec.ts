import { GroundFailureOverlaysPipe } from './ground-failure-overlays.pipe';

describe('GroundFailureOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new GroundFailureOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('returns empty array of overlays if product is null', () => {
      const pipe = new GroundFailureOverlaysPipe();
      expect(pipe.transform(null)).toEqual([]);
    });
    it('returns array of overlays', () => {
      const pipe = new GroundFailureOverlaysPipe();
      expect(pipe.transform({}).length).toEqual(2);
    });
  });
});
