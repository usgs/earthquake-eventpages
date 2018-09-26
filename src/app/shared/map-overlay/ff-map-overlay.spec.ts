import { FfOverlaysPipe } from './../ff-overlays.pipe';
import { FfMapOverlay } from '@shared/map-overlay/ff-map-overlay';
import { CoreModule } from './../../core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('FfMapOverlay', () => {
  let overlay, pipe;

  const ff = {
    geometry: {
      coordinates: [
        [
          [-154.5335, 19.5305, 4152.27482],
          [-154.5665, 19.5126, 4152.27482],
          [-154.5777, 19.5309, 5007.32518],
          [-154.5446, 19.5489, 5007.32518],
          [-154.5335, 19.5305, 4152.27482]
        ]
      ],
      type: 'Polygon'
    },
    properties: {
      fill: '#FFFFFF',
      'fill-opacity': 1,
      rake: 134.6997,
      rise: 0.8,
      sf_moment: 9840000000000000.0,
      slip: 0.0606,
      'stroke-width': 1.5,
      trup: 0.0,
      'x==ew': 50.3084,
      'y==ns': 16.9154
    },
    type: 'Feature'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientModule]
    });
    pipe = new FfOverlaysPipe();
    overlay = new FfMapOverlay(ff);
  });

  it('instantiates overlay instance', () => {
    expect(overlay).toBeTruthy();
  });

  it('creates an overlay with a finite fault product', () => {
    const overlayArr = pipe.transform({
      contents: { 'FFM.geojson': { url: 'url' } }
    });
    expect(overlayArr.length).toEqual(1);
  });

  it('sets the layer', () => {
    expect(overlay.layer).not.toBeNull();
  });

  it('sets the url', () => {
    const overlayTest = new FfMapOverlay({
      contents: { 'FFM.geojson': { url: 'url' } }
    });
    expect(overlayTest.url).toEqual('url');
  });

  it('checks the getUrl function', () => {
    let url = overlay.getUrl(null);
    expect(url).toBeNull();
    url = overlay.getUrl({
      contents: { 'FFM.geojson': { url: 'url' } }
    });
    expect(url).toEqual('url');
  });
});
