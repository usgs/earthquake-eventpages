import { NearbySeismicityLinkPipe } from './nearby-seismicity-link.pipe';
import { Event } from '../event';


describe('NearbySeismicityLinkPipe', () => {
  let pipe: NearbySeismicityLinkPipe;
  let event: Event;
  let link: string;

  beforeEach(() => {
    pipe = new NearbySeismicityLinkPipe();
    event = new Event({
      'id': 'us10004u1y',
      'geometry': {
        'coordinates': [94.3299, -4.9521]
      }
    });
    link = '/earthquakes/map/#' + '%7B%22autoUpdate%22%3Afalse%2C%22basemap%22%3A' +
      '%22terrain%22%2C%22event%22%3A%22us10004u1y%22%2C%22feed%22%3A%22us10004u1y' +
      '%22%2C%22mapposition%22%3A%5B%5B-85%2C-180%5D%2C%5B85%2C180%5D%5D%2C%22search' +
      '%22%3A%7B%22id%22%3A%22us10004u1y%22%2C%22isSearch%22%3Atrue%2C%22name%22%3A' +
      '%22Search%20Results%22%2C%22params%22%3Afalse%7D%7D';
  });

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    it('returns null when no event is found', () => {
      expect(pipe.transform(null, 'nearby')).toBeNull();
    });

    it('returns null when event geometry property is null', () => {
      event.geometry = null;
      expect(pipe.transform(event, 'nearby')).toBeNull();
    });

    it('returns null when event id property is null', () => {
      event.id = null;
      expect(pipe.transform(event, 'nearby')).toBeNull();
    });

    it('returns null when the second parameter is other than \'nearby\' or \'kml\'', () => {
      expect(pipe.transform(event, 'notNearby')).toBeNull();
    });

    it('returns link when second parameter is \'nearby\'', () => {
      expect(pipe.transform(event, 'nearby')).toEqual(link);
    });

    it('returns kml link when second parameter is \'kml\' and event id is \'event\'', () => {
      event.id = 'event';
      expect(pipe.transform(event, 'kml')).toEqual('/earthquakes/feed/v1.0/detail/event.kml');
    });

});
