import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { Event } from '../../event';
import { NavigationComponent } from './navigation.component';
import {MockPipe} from '../../mock-pipe';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,

        MockComponent({selector: 'app-navigation-group'}),
        MockComponent({selector: 'app-navigation-item', inputs: ['display', 'navHrefLink', 'navRouterLink']}),
        MockPipe('nearbySeismicityLink')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getKmlLink', () => {
    it('uses event.id in link', () => {
      const event = new Event({id: 'event'});
      const link = component.getKmlLink(event);

      expect(link).toBe('/earthquakes/feed/v1.0/detail/event.kml');
     });
  });

  describe('getLatestEarthquakesLink', () => {
    let mapPositionSpy;

    beforeEach(() => {
      mapPositionSpy = spyOn(component, 'getMapPosition').and.returnValue({});
    });

     const parseSettings = function (link: string) {
       const parts = link.split('#');
       const settings = JSON.parse(decodeURIComponent(parts[1]));

       return settings;
     };


    it('uses current map position', () => {
      const params = {};
      const link = component.getLatestEarthquakesLink('eventid', params);
      const settings = parseSettings(link);

      expect(mapPositionSpy).toHaveBeenCalled();
      expect(mapPositionSpy).toHaveBeenCalledWith(params);
      expect(settings.feed).toEqual('eventid');
    });

    it('works without parameters', () => {
      const link = component.getLatestEarthquakesLink();
      const settings = parseSettings(link);

      expect(Math.abs(settings.feed - (new Date()).getTime())).toBeLessThan(1000);
      expect(settings.mapposition).toEqual({});
    });
  });

  describe('getMapPosition', () => {
    it('uses defaults without params', () => {
      const mapPosition = component.getMapPosition();
      expect(mapPosition).toEqual([[-85, -180], [85, 180]]);
    });

    it('uses provided rectangle parameters parameters', () => {
      const mapPosition = component.getMapPosition({
        minlatitude: -1, minlongitude: -2, maxlatitude: 3, maxlongitude: 4
      });
      expect(mapPosition).toEqual([[-1, -2], [3, 4]]);
    });

    it('uses circle parameters', () => {
      const mapPosition = component.getMapPosition({
        latitude: 0, longitude: 0, maxradiuskm: 0
      });
      expect(mapPosition).toEqual([[0, 0], [0, 0]]);
    });
  });

  describe('getNearbySeismicityLink', () => {
    it('guards against null/bad event parameter', () => {
      expect(component.getNearbySeismicityLink(null)).toEqual(undefined);
      expect(component.getNearbySeismicityLink(
          new Event({}))).toEqual(undefined);
      expect(component.getNearbySeismicityLink(
          new Event({geometry: true}))).toEqual(undefined);
    });

    it('calls proper sub-methods', () => {
      const leqSpy = spyOn(component, 'getLatestEarthquakesLink').and.returnValue('');
      const nspSpy = spyOn(component, 'getNearbySeismicityParams').and.returnValue({});
      const event = new Event({geometry: {}, id: 'eventid'});

      component.getNearbySeismicityLink(event);
      expect(leqSpy).toHaveBeenCalled();
      expect(leqSpy).toHaveBeenCalledWith('eventid', {});

      expect(nspSpy).toHaveBeenCalled();
      expect(nspSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('getNearbySeismicityParams', () => {
    it('returns expected results', () => {
      const event = new Event({
        geometry: {coordinates: [1, 2, 3]},
        properties: {time: 0, mag: 5}
      });
      const result = component.getNearbySeismicityParams(event);

      expect(result).toEqual({
        endtime: '1970-01-22T00:00:00.000Z',
        latitude: 2,
        longitude: 1,
        maxradiuskm: 250,
        minmagnitude: 2,
        starttime: '1969-12-11T00:00:00.000Z'
      });
    });

    it('uses default when mag is null', () => {
      const event = new Event({
        geometry: {coordinates: [1, 2, 3]},
        properties: {time: 0, mag: null}
      });
      const result = component.getNearbySeismicityParams(event);

      expect(result).toEqual({
        endtime: '1970-01-22T00:00:00.000Z',
        latitude: 2,
        longitude: 1,
        maxradiuskm: 250,
        minmagnitude: 1,
        starttime: '1969-12-11T00:00:00.000Z'
      });
    });

    it('short circuits on bad event information', () => {
      // No longitude
      let event = new Event({
        geometry: {coordinates: [null, 2, 3]},
        properties: {time: 0, mag: 5}
      });
      let result = component.getNearbySeismicityParams(event);
      expect(result).toBe(false);

      // No latitude
      event = new Event({
        geometry: {coordinates: [1, null, 3]},
        properties: {time: 0, mag: 5}
      });
      result = component.getNearbySeismicityParams(event);
      expect(result).toBe(false);

      // No time
      event = new Event({
        geometry: {coordinates: [1, 2, 3]},
        properties: {time: null, mag: 5}
      });
      result = component.getNearbySeismicityParams(event);
      expect(result).toBe(false);
    });
  });

  describe('hasImpact', () => {
    it('defers to event method', () => {
      const event = new Event({});
      const spy = spyOn(event, 'hasProducts').and.returnValue(true);
      const result = component.hasImpact(event);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([
        'dyfi', 'impact-text', 'impact-link', 'losspager', 'ground-failure',
            'shakemap'
      ]);
      expect(result).toBe(true);
    });
  });

  describe('hasScientific', () => {
    it('defers to event method', () => {
      const event = new Event({});
      const spy = spyOn(event, 'hasProducts').and.returnValue(true);
      const result = component.hasScientific(event);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([
        'origin', 'phase-data', 'moment-tensor',
        'focal-mechanism', 'finite-fault', 'oaf'
      ]);
      expect(result).toBe(true);
    });
  });
});
