import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { Event } from '../../event';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,

        MockComponent({selector: 'app-navigation-group'}),
        MockComponent({selector: 'app-navigation-item', inputs: ['display', 'navHrefLink', 'navRouterLink']})
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
});
