import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';
import { OafService } from '../oaf.service';
import { CommentaryComponent } from './commentary.component';

describe('CommentaryComponent', () => {
  let component: CommentaryComponent;
  let fixture: ComponentFixture<CommentaryComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of(null)
    };

    const oafServiceStub = {
      oaf$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        CommentaryComponent,

        MockComponent({ selector: 'oaf-commentary-details', inputs: ['bin'] }),

        MockPipe('oafPercent'),
        MockPipe('sharedDateTime'),
        MockPipe('sharedNumberWithSeparator'),
        MockPipe('sharedRoundDown'),
        MockPipe('sharedRoundUp'),
        MockPipe('sharedSignificantFigure'),
        MockPipe('updateTime')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: OafService, useValue: oafServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('transformObservations', () => {
    const observations = [
      {
        count: 1,
        magnitude: 3.0
      },
      {
        count: 2,
        magnitude: 5.0
      },
      {
        count: 3,
        magnitude: 6.0
      },
      {
        count: 4,
        magnitude: 7.0
      }
    ];

    it('should return the correct count', () => {
      expect(component.transformObservations(3, observations)).toEqual(1);
      expect(component.transformObservations(5, observations)).toEqual(2);
      expect(component.transformObservations(6, observations)).toEqual(3);
      expect(component.transformObservations(7, observations)).toEqual(4);
    });
  });

  describe('transformForecast', () => {
    const mag3Bin = {
      p95minimum: 0.0,
      p95maximum: 11.0,
      probability: 0.5086189828476289,
      magnitude: 3.0
    };

    const mag5Bin = {
      p95minimum: 0.0,
      p95maximum: 0.0,
      probability: 0.010696767527439643,
      magnitude: 5.0
    };

    const mag6Bin = {
      p95minimum: 0.0,
      p95maximum: 0.0,
      probability: 0.001322204038141761,
      magnitude: 6.0
    };

    const mag7Bin = {
      p95minimum: 0.0,
      p95maximum: 0.0,
      probability: 1.6276102079104682e-4,
      magnitude: 7.0
    };

    const oaf = {
      advisoryTimeFrame: '1 Day',
      forecast: [
        {
          timeEnd: 1515148777730,
          bins: [mag3Bin, mag5Bin, mag6Bin, mag7Bin],
          timeStart: 1515062377730,
          aboveMainshockMag: {
            probability: 0.03865917408876185,
            magnitude: 4.38
          },
          label: '1 Day'
        }
      ]
    };

    it('should return the correct count', () => {
      const oafCopy = Object.assign(oaf);
      const forecast = component.transformForecast(oaf);
      expect(forecast.bins['magnitude-3']).toEqual(mag3Bin);
      expect(forecast.bins['magnitude-5']).toEqual(mag5Bin);
      expect(forecast.bins['magnitude-6']).toEqual(mag6Bin);
      expect(forecast.bins['magnitude-7']).toEqual(mag7Bin);
    });
  });
});
