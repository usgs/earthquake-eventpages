import { convertToParamMap } from '@angular/router';

import { Event } from '../event';
import { EpicenterOverlay } from '@shared/map-overlay/epicenter-overlay';
import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { RegionInfoOverlaysPipe } from './region-info-overlays.pipe';

describe('InteractiveMapOverlaysPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new InteractiveMapOverlaysPipe();
  });

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('clears cache when event changes', () => {
    pipe.lastEvent = new Event({});
    pipe.overlayCache = { stuff: 'things' };

    expect(pipe.transform(null, null)).toEqual([]);
    expect(pipe.lastEvent).toBeNull();
    expect(pipe.overlayCache).toEqual({});
  });

  it('caches overlays when product unchanged', () => {
    const event = new Event({
      id: 'us0000test',
      properties: {
        products: {
          origin: [
            {
              properties: {
                latitude: '12',
                longitude: '13'
              }
            },
            {
              code: 'othercode',
              properties: {
                latitude: '14',
                longitude: '15'
              },
              source: 'othersource'
            }
          ]
        }
      }
    });
    const params = convertToParamMap({});
    const otherparams = convertToParamMap({
      epicenter: 'false',
      'origin-code': 'othercode',
      'origin-source': 'othersource'
    });

    pipe.overlayFactories = [
      { type: 'origin', pipe: new RegionInfoOverlaysPipe() }
    ];

    let overlays = pipe.transform(event, null);
    const epicenterOverlay = overlays.filter(overlay => {
      return overlay instanceof EpicenterOverlay;
    })[0];

    // same event, with params object that results in same product
    overlays = pipe.transform(event, params);
    expect(
      overlays.filter(overlay => {
        return overlay instanceof EpicenterOverlay;
      })[0]
    ).toBe(epicenterOverlay);

    // different params, should be different overlay
    overlays = pipe.transform(event, otherparams);
    const otherEpicenterOverlay = overlays.filter(overlay => {
      return overlay instanceof EpicenterOverlay;
    })[0];
    expect(otherEpicenterOverlay).not.toBe(epicenterOverlay);
    expect(otherEpicenterOverlay.enabled).toBeFalsy();
  });
});
