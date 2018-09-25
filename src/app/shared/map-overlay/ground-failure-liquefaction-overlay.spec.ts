import { GroundFailureLiquefactionOverlay } from './ground-failure-liquefaction-overlay';

describe('GroundFailureLiquefactionOverlay', () => {
  let overlay, product;

  beforeEach(() => {
    product = {
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
        'minimum-longitude': 0
      }
    };
    overlay = new GroundFailureLiquefactionOverlay(product);
  });

  it('can be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('sets the bounds', () => {
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
    expect(overlay.layer).not.toBeNull();
  });

  it('sets the legend', () => {
    expect(overlay.legends).not.toBeNull();
    expect(overlay.legends.length).toEqual(1);
  });
});
