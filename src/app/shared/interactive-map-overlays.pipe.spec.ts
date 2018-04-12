import { InteractiveMapOverlaysPipe } from './interactive-map-overlays.pipe';
import { Event } from '../event';
import { HistoricSeismicityOverlay } from '../shared/map-overlay/historic-seismicity-overlay';
import { convertToParamMap } from '@angular/router';
import { EpicenterOverlay } from '../shared/map-overlay/epicenter-overlay';

describe('InteractiveMapOverlaysPipe', () => {
  it('create an instance', () => {
    const pipe = new InteractiveMapOverlaysPipe();
    expect(pipe).toBeTruthy();
  });

  it('clears cache when event changes', () => {
    const pipe = new InteractiveMapOverlaysPipe();

    pipe.lastEvent = new Event({});
    pipe.overlayCache = {stuff: 'things'};

    expect(pipe.transform(null, null)).toEqual([]);
    expect(pipe.lastEvent).toBeNull();
    expect(pipe.overlayCache).toEqual({});
  });

  it('caches overlays when product unchanged', () => {
    const pipe = new InteractiveMapOverlaysPipe();
    const event = new Event({
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
              source: 'othersource',
              code: 'othercode',
              properties: {
                latitude: '14',
                longitude: '15'
              }
            }
          ]
        }
      }
    });
    const params = convertToParamMap({});
    const otherparams = convertToParamMap({
      'origin-source': 'othersource',
      'origin-code': 'othercode',
      'epicenter': 'false'
    });

    let overlays = pipe.transform(event, null);
    const epicenterOverlay = overlays.filter((overlay) => {
      return (overlay instanceof EpicenterOverlay);
    })[0];

    // same event, with params object that results in same product
    overlays = pipe.transform(event, params);
    expect(overlays.filter((overlay) => {
      return (overlay instanceof EpicenterOverlay);
    })[0]).toBe(epicenterOverlay);

    // different params, should be different overlay
    overlays = pipe.transform(event, otherparams);
    const otherEpicenterOverlay = overlays.filter((overlay) => {
      return (overlay instanceof EpicenterOverlay);
    })[0];
    expect(otherEpicenterOverlay).not.toBe(epicenterOverlay);
    expect(otherEpicenterOverlay.enabled).toBeFalsy();
  });
});
