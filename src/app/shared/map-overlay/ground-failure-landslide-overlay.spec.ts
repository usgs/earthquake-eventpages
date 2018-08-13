import * as L from 'leaflet';

import { GroundFailureLandslideOverlay } from './ground-failure-landslide-overlay';

describe('GroundFailureLandslideOverlay', () => {
  const product = {
    contents: {
      'jessee.png': {
        url: 'test.html'
      }
    },
    properties: {
      'landslide-maximum-latitude': 0,
      'landslide-maximum-longitude': 0,
      'landslide-minimum-latitude': 0,
      'landslide-minimum-longitude': 0,
      'landslide-overlay': 'jessee.png',
      'maximum-latitude': 0,
      'maximum-longitude': 0,
      'minimum-latitude': 0,
      'minimum-longitude': 0
    }
  };

  it('can be created', () => {
    expect(new GroundFailureLandslideOverlay()).toBeTruthy();
  });

  it('sets the bounds', () => {
    const overlay = new GroundFailureLandslideOverlay(product);
    expect(overlay.bounds).toEqual([
      [
        product.properties['minimum-latitude'],
        product.properties['minimum-longitude']
      ],
      [
        product.properties['maximum-latitude'],
        product.properties['maximum-longitude']
      ]
    ]);
  });

  it('sets the layer', () => {
    const overlay = new GroundFailureLandslideOverlay(product);
    expect(overlay.layer).not.toBeNull();
  });

  it('sets the legend', () => {
    const overlay = new GroundFailureLandslideOverlay(product);
    expect(overlay.legend).not.toBeNull();
    expect(overlay.legend.nodeName).toEqual('IMG');
  });
});
