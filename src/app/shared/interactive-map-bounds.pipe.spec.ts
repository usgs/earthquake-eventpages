import { convertToParamMap } from '@angular/router';

import { InteractiveMapBoundsPipe } from './interactive-map-bounds.pipe';

describe('InteractiveMapBoundsPipe', () => {
  it('create an instance', () => {
    const pipe = new InteractiveMapBoundsPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('returns null if params are null', () => {
      const pipe = new InteractiveMapBoundsPipe();
      expect(pipe.transform(undefined)).toBeNull();
    });

    it('returns null if bounds param is empty', () => {
      const pipe = new InteractiveMapBoundsPipe();
      expect(pipe.transform(convertToParamMap({ bounds: null }))).toBeNull();
    });

    it('returns parsed bounds', () => {
      const pipe = new InteractiveMapBoundsPipe();
      const params = convertToParamMap({ bounds: ['34,-118', '39,-105'] });
      expect(pipe.transform(params)).toEqual([[34, -118], [39, -105]]);
    });
  });
});
