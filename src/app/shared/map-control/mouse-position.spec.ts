import { MousePosition } from './mouse-position';

describe('MousePosition', () => {
  let mousePosition;
  let mapStub;
  let eventPositive, eventNegative;

  afterEach(() => {
    mousePosition = null;
  });

  beforeEach(() => {
    mousePosition = new MousePosition();

    mapStub = {
      eachLayer: layer => {
        return layer;
      },
      hasLayer: layer => {
        return layer.mapHasLayer || false;
      },
      off: jasmine.createSpy(),
      on: jasmine.createSpy()
    };

    eventPositive = {
      latlng: {
        lat: 35.48898747389,
        lng: 118.30339988589
      }
    };

    eventNegative = {
      latlng: {
        lat: -19.39874587397,
        lng: -102.3774666483
      }
    };

    spyOn(mapStub, 'hasLayer').and.callThrough();
  });

  it('onAdd', () => {
    mousePosition.onAdd(mapStub);
    expect(mapStub.on).toHaveBeenCalled();
  });

  it('onRemove', () => {
    mousePosition.onRemove(mapStub);
    expect(mapStub.off).toHaveBeenCalled();
  });

  it('_onMouseMove with positive event', () => {
    mousePosition.onAdd(mapStub);
    mousePosition._onMouseMove(eventPositive);

    const el = mousePosition._container;
    const html = el.innerHTML;
    expect(html).toEqual('35.489°N : 118.303°E');
  });

  it('_onMouseMove with negative event', () => {
    mousePosition.onAdd(mapStub);
    mousePosition._onMouseMove(eventNegative);

    const el = mousePosition._container;
    const html = el.innerHTML;
    expect(html).toEqual('19.399°S : 102.377°W');
  });
});
