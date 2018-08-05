import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { MapComponent } from './map.component';


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
            'bounds',
            'overlays',
            'showLayersControl',
            'showLegendControl',
            'showScaleControl',
            'interactive'
          ]
        }),
        MockComponent({selector: 'shared-summary-link',
            inputs: ['productType', 'event']}),
        MockPipe('interactiveMapBounds'),
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
