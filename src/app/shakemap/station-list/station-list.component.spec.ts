import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StationListComponent } from './station-list.component';

import { EventService } from '../../event.service';
import { StationService } from '../../station.service';

import { of } from 'rxjs/observable/of';
import { MockComponent } from 'ng2-mock-component';

describe('StationListComponent', () => {
  let component: StationListComponent;
  let fixture: ComponentFixture<StationListComponent>;
  let eventService;
  let stationService;

  beforeEach(async(() => {

    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const stationServiceStub = {
      stations: of({}),
      getStations: jasmine.createSpy('stationService::get'),
    };

    TestBed.configureTestingModule({
      declarations: [
        StationListComponent,

        MockComponent({selector: 'shared-station', inputs: ['station']})
        ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: StationService, useValue: stationServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    eventService = fixture.debugElement.injector.get(EventService);
    stationService = fixture.debugElement.injector.get(StationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
