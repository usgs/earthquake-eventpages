import { FetchNearbyCitiesPipe } from './fetch-nearby-cities.pipe';

describe('FetchNearbyCitiesPipe', () => {
  it('create an instance', () => {
    const pipe = new FetchNearbyCitiesPipe();
    expect(pipe).toBeTruthy();
  });
});
