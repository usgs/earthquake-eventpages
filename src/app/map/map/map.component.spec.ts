import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MapComponent } from './map.component';
import { of } from 'rxjs/observable/of';
import { Event } from '../../event';
import { RouterTestingModule } from '@angular/router/testing';
import { MockPipe } from '../../mock-pipe';
import { EventService } from '../../../..';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };
    TestBed.configureTestingModule({
      declarations: [
        MapComponent,

        MockComponent({
          selector: 'shared-map',
          inputs: [
            'overlays',
            'showLayersControl',
            'showLegendControl',
            'showScaleControl',
            'interactive'
          ]
       }),
        MockPipe('interactiveMapOverlays')
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
