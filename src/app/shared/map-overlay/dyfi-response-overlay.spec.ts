import { CoreModule } from './../../core/core.module';
import { DyfiOverlaysPipe } from '@shared/dyfi-overlays.pipe';
import { DyfiResponseOverlay } from '@shared/map-overlay/dyfi-response-overlay';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('DyfiResponseOverlay', () => {
  let overlay, pipe;

  const DYFI: any = {
    contents: {
      'dyfi_geo_10km.geojson': { url: 'url' },
      'dyfi_geo_1km.geojson': { url: 'url' }
    },
    type: 'dyfi'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientModule]
    });
    pipe = new DyfiOverlaysPipe();
    overlay = new DyfiResponseOverlay(null);
  });

  it('instantiates overlay instance', () => {
    expect(overlay).toBeTruthy();
  });

  it('creates an overlay with a dyfi product', () => {
    const overlays = pipe.transform(DYFI);
    expect(overlays.length).toEqual(2);
  });

  it('sets the layer', () => {
    overlay = new DyfiResponseOverlay(DYFI);
    expect(overlay.layer).not.toBeNull();
  });
});
