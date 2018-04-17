import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Event } from '../../event';
import { EventService } from '../../core/event.service';
import { MapComponent } from './map.component';
import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

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
            'overlays'
          ]
       }),
        MockPipe('shakemapMapOverlays')
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
