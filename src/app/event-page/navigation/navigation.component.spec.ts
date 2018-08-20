import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,

        MockComponent({ selector: 'app-navigation-group' }),
        MockComponent({
          inputs: ['display', 'navHrefLink', 'navRouterLink'],
          selector: 'app-navigation-item'
        }),
        MockPipe('nearbySeismicityLink')
      ]
    }).compileComponents();
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
      const event = new Event({ id: 'event' });
      const link = component.getKmlLink(event);

      expect(link).toBe('/earthquakes/feed/v1.0/detail/event.kml');
    });
  });

  describe('hasImpact', () => {
    it('defers to event method', () => {
      const event = new Event({});
      const spy = spyOn(event, 'hasProducts').and.returnValue(true);
      const result = component.hasImpact(event);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([
        'dyfi',
        'impact-text',
        'impact-link',
        'losspager',
        'ground-failure',
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
        'origin',
        'phase-data',
        'moment-tensor',
        'focal-mechanism',
        'finite-fault',
        'oaf'
      ]);
      expect(result).toBe(true);
    });
  });
});
