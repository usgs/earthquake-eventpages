import { FfOverlaysPipe } from './ff-overlays.pipe';

describe('FfOverlaysPipe', () => {
  let pipe;

  const ff: any = {
    contents: {
      'FFM.geojson': { url: 'url' }
    }
  };

  beforeEach(() => {
    pipe = new FfOverlaysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('handles product', () => {
    const result = pipe.transform(ff);
    expect(result.length).toEqual(1);
  });
});
