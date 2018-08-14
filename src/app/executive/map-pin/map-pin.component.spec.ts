import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { MapPinComponent } from './map-pin.component';

describe('MapPinComponent', () => {
  let component: MapPinComponent;
  let fixture: ComponentFixture<MapPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapPinComponent,

        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['overlays', 'showAttributionControl', 'showLayersControl'],
          selector: 'shared-map'
        }),

        MockPipe('getProduct'),
        MockPipe('interactiveMapOverlays')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
