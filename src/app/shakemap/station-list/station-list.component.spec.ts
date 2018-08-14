import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material/divider';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { StationService } from '@core/station.service';
import { StationListComponent } from './station-list.component';

describe('StationListComponent', () => {
  let component: StationListComponent;
  let fixture: ComponentFixture<StationListComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const stationServiceStub = {
      stationsJson$: of({}),
      getStations: jasmine.createSpy('stationService::get')
    };

    TestBed.configureTestingModule({
      imports: [MatDividerModule],
      declarations: [
        StationListComponent,

        MockComponent({ selector: 'shared-station', inputs: ['station'] })
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: StationService, useValue: stationServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onStations', () => {
    it('handles null input', () => {
      component.onStations(null);
      expect(component.stations).toEqual([]);
    });
  });
});
