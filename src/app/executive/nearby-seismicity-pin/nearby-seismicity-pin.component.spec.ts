import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbySeismicityPinComponent } from './nearby-seismicity-pin.component';
import {MockComponent} from 'ng2-mock-component';
import {MockPipe} from '../../mock-pipe';
import {Event} from '../../event';


describe('NearbySeismicityPinComponent', () => {
  let component: NearbySeismicityPinComponent;
  let fixture: ComponentFixture<NearbySeismicityPinComponent>;
  let event: Event;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        NearbySeismicityPinComponent,

        MockComponent({
          selector: 'basic-pin',
          inputs: [
            'footer',
            'title',
            'href'
          ]
        }),

        MockPipe('sharedNumber')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    event = new Event({
      'id': 'us10004u1y'
    });

    fixture = TestBed.createComponent(NearbySeismicityPinComponent);
    component = fixture.componentInstance;
    component.title = 'Nearby Seismicity';
    component.event = event;
    component.link = 'testLink';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Minimum Magnitude Variations', () => {

    it('should return 6', () => {
      expect(component.getMinimumMag(9)).toBe(6);
    });

    it('should return 5', () => {
      expect(component.getMinimumMag(8)).toBe(5);
    });

    it('should return 4', () => {
      expect(component.getMinimumMag(7)).toBe(4);
    });

    it('should return 3', () => {
      expect(component.getMinimumMag(6)).toBe(3);
    });

    it('should return 2', () => {
      expect(component.getMinimumMag(5)).toBe(2);
    });

    it('should return 1', () => {
      expect(component.getMinimumMag(4)).toBe(1);
    });

    it('should return 1', () => {
      expect(component.getMinimumMag(1)).toBe(1);
    });

  });

});
