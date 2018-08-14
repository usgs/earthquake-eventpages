import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { DyfiService } from '../dyfi.service';
import { ResponsesVsTimeComponent } from './responses-vs-time.component';

describe('ResponsesVsTimeComponent', () => {
  let component: ResponsesVsTimeComponent;
  let fixture: ComponentFixture<ResponsesVsTimeComponent>;

  beforeEach(async(() => {
    const RESPONSE_SERIES = {
      name: 'DYFI',
      series: {
        name: 'Responses',
        series: []
      }
    };

    const eventServiceStub = {
      product$: of({})
    };

    const dyfiServiceStub = {
      getNumResp: () => null,
      plotNumResp$: of(RESPONSE_SERIES)
    };

    TestBed.configureTestingModule({
      declarations: [
        ResponsesVsTimeComponent,

        MockComponent({
          inputs: [
            'scheme',
            'results',
            'gradient',
            'xAxis',
            'yAxis',
            'legend',
            'showXAxisLabel',
            'showYAxisLabel',
            'xAxisLabel',
            'yAxisLabel',
            'autoScale',
            'timeline'
          ],
          selector: 'ngx-charts-line-chart'
        }),

        MockPipe('sharedProductContent')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: DyfiService, useValue: dyfiServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesVsTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDyfiSeries', () => {
    it('handles null product', () => {
      component.onDyfiSeries(null);

      expect(component.dyfiSeries).toBeNull();
    });
  });
});
