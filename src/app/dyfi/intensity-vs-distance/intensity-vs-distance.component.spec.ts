import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { DyfiService } from '../dyfi.service';
import { MockPipe } from '../../mock-pipe';
import { IntensityVsDistanceComponent } from './intensity-vs-distance.component';

describe('IntensityVsDistanceComponent', () => {
  let component: IntensityVsDistanceComponent;
  let fixture: ComponentFixture<IntensityVsDistanceComponent>;
  let SAMPLE_SERIES;

  beforeEach(async(() => {
    const DYFI_SERIES = {
      name: 'DYFI',
      series: [
        {
          class: 'none',
          name: 'Series1',
          series: []
        }
      ]
    };

    SAMPLE_SERIES = {
      name: 'Sample',
      series: [
        {
          class: 'scatterplot1',
          name: 'All reported data',
          series: [{ nresp: 5 }]
        },
        {
          class: 'estimated1',
          name: 'Estimated data',
          series: []
        },
        {
          class: 'binned',
          name: 'Binned data',
          series: [{}]
        }
      ]
    };

    const eventServiceStub = {
      product$: of({
        properties: {
          maxmmi: 5
        }
      })
    };

    const dyfiServiceStub = {
      getAtten: () => null,
      plotAtten$: of(DYFI_SERIES)
    };

    TestBed.configureTestingModule({
      declarations: [
        IntensityVsDistanceComponent,

        MockComponent({
          inputs: [
            'scheme',
            'colorSchemeLine',
            'customColors',
            'customTicks',
            'results',
            'animations',
            'bubbleTooltipTemplate',
            'lineChart',
            'lineChartTooltip',
            'bubbleChart',
            'bubbleChartTooltip',
            'tooltipDisabled',
            'gradient',
            'xAxis',
            'yAxis',
            'legend',
            'showGridLines',
            'showXAxisLabel',
            'showYAxisLabel',
            'showRightYAxisLabel',
            'xAxisLabel',
            'yAxisLabel',
            'yScaleMin',
            'yScaleMax',
            'xScaleMin',
            'xScaleMax',
            'xAxisTicks',
            'yAxisTicks',
            'xScaleType'
          ],
          selector: 'bubble-line-chart-component'
        }),

        MockPipe('sharedProductContent'),
        MockPipe('sharedNumber')
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: DyfiService, useValue: dyfiServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntensityVsDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDyfiSeries', () => {
    it('handles null data', () => {
      component.onDyfiSeries(null);

      expect(component.bubbleSeries).toBe(null);
      expect(component.lineSeries).toBe(null);
    });

    it('handles known data', () => {
      component.onDyfiSeries(SAMPLE_SERIES);
      expect(component.allResults[0].class).toEqual(
        SAMPLE_SERIES.series[0].class
      );
      expect(component.allResults[0].series[0]).toEqual({
        nresp: 5,
        opacity: 0.2
      });
      expect(component.allResults.length).toEqual(3);
    });

    it('handles null data', () => {
      component.onDyfiSeries(null);
      expect(component.bubbleSeries).toBeNull();
      expect(component.lineSeries).toBeNull();
    });
  });

  describe('onProduct', () => {
    it('Adjusts x-axis for small events', () => {
      const product = {
        properties: {
          maxmmi: 3
        }
      };
      component.onProduct(product);

      expect(component.xScaleMax).toBe(500);
    });
  });
});
