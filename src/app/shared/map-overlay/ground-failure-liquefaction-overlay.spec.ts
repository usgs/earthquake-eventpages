import { GroundFailureLiquefactionOverlay } from './ground-failure-liquefaction-overlay';

import * as L from 'leaflet';


describe('GroundFailureLiquefactionOverlay', () => {
  const product = {
    contents: {
      'zhu.png': {
        url: 'test.html'
      }
    },
    properties: {
      'liquefaction-maximum-latitude': 0,
      'liquefaction-maximum-longitude': 0,
      'liquefaction-minimum-latitude': 0,
      'liquefaction-minimum-longitude': 0,
      'liquefaction-overlay': 'zhu.png',
      'maximum-latitude': 0,
      'maximum-longitude': 0,
      'minimum-latitude': 0,
      'minimum-longitude': 0,
    }
  };

  it('can be created', () => {
    expect(new GroundFailureLiquefactionOverlay()).toBeTruthy();
  });

  it('sets the bounds', () => {
    const overlay = new GroundFailureLiquefactionOverlay(product);
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
    const overlay = new GroundFailureLiquefactionOverlay(product);
    expect(overlay.layer).not.toBeNull();
  });

  it('sets the legend', () => {
    const overlay = new GroundFailureLiquefactionOverlay(product);
    expect(overlay.legend).not.toBeNull();
    expect(overlay.legend.nodeName).toEqual('IMG');
  });
});
