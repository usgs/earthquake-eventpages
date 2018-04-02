import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPinComponent } from './map-pin.component';
import { MockComponent } from 'ng2-mock-component';
import { MockPipe } from '../../mock-pipe';

describe('MapPinComponent', () => {
  let component: MapPinComponent;
  let fixture: ComponentFixture<MapPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapPinComponent,

        MockComponent({selector: 'basic-pin', inputs: ['link', 'product', 'title']}),
        MockComponent({selector: 'shared-map', inputs: ['overlays', 'showAttributionControl', 'showLayersControl']}),

        MockPipe('getProduct'),
        MockPipe('interactiveMapOverlays')
      ]
    })
    .compileComponents();
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
