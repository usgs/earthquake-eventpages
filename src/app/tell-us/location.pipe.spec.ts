import { LocationPipe } from './location.pipe';
import { Location } from '@shared/geo.service';
import { FeltReport } from './felt-report';

describe('LocationPipe', () => {
  it('create an instance', () => {
    const pipe = new LocationPipe();
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('returns address when provided location', () => {
      const pipe = new LocationPipe();
      const location = {
        address: 'address',
        latitude: 0,
        longitude: 0
      } as Location;

      expect(pipe.transform(location, null)).toBe('address');
      expect(pipe.transform(null, null)).toBe('');
    });

    it('updates feltReport location if provided', done => {
      const pipe = new LocationPipe();
      const feltReport = {} as FeltReport;

      pipe.transform(null, feltReport);
      setTimeout(() => {
        expect(feltReport.location).toBeNull();
        done();
      });
    });
  });
});
