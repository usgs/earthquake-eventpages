import { GroundFailureLandslideOverlay } from './ground-failure-landslide-overlay';

describe('GroundFailureLandslideOverlay', () => {
  let overlay, product;

  beforeEach(() => {
    product = {
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
    overlay = new GroundFailureLandslideOverlay(product);
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
