import { FetchNearbyCitiesPipe } from './fetch-nearby-cities.pipe';

describe('FetchNearbyCitiesPipe', () => {
  let pipe, service;

  beforeEach(() => {
    service = {
      get: jasmine.createSpy()
    };

    pipe = new FetchNearbyCitiesPipe(service);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('returns as output what was provided as input', () => {
      const obj = {};
      expect(pipe.transform(obj)).toBe(obj);
    });

    it('triggers service get', () => {
      const obj = {};
      pipe.transform(obj);

      expect(service.get).toHaveBeenCalledWith(obj);
    });
  });
});
