import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { OafService } from '../oaf.service';
import { ForecastProbabilityTableComponent } from './forecast-probability-table.component';

describe('ForecastNumberTableComponent', () => {
  let component: ForecastProbabilityTableComponent;
  let fixture: ComponentFixture<ForecastProbabilityTableComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      getProduct: jasmine.createSpy('eventService::getProduct')
    };

    const oafServiceStub = {
      getProduct: jasmine.createSpy('eventService::getOaf')
    };

    TestBed.configureTestingModule({
      declarations: [
        ForecastProbabilityTableComponent,

        MockPipe('oafPercent'),
        MockPipe('sharedNumberWithSeparator'),
        MockPipe('sharedRoundDown'),
        MockPipe('sharedRoundUp')
      ],
      imports: [MatTableModule],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: OafService, useValue: oafServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastProbabilityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
