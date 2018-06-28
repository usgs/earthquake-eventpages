import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';
import { IntensityVsDistanceComponent } from './intensity-vs-distance.component';

describe('IntensityVsDistanceComponent', () => {
  let component: IntensityVsDistanceComponent;
  let fixture: ComponentFixture<IntensityVsDistanceComponent>;
  let SampleSeries;

  beforeEach(async(() => {
    const DyfiSeries = {
      name: 'DYFI',
      series: [
        {
          name: 'Series1',
          class: 'none',
          series: []
        }
      ]
    };

    SampleSeries = {
      name: 'Sample',
      series: [
        {
          name: 'All reported data',
          class: 'scatterplot1',
          series: []
        },
        {
          name: 'Estimated data',
          class: 'estimated1',
          series: []
        },
        {
          name: 'Binned data',
          class: 'binned',
          series: [{}]
        },
      ]
    };

    const eventServiceStub = {
      product$: of({})
    };

    const dyfiServiceStub = {
      plotAtten$: of(DyfiSeries),
      getAtten: () => null
    };

    TestBed.configureTestingModule({
      declarations: [
        IntensityVsDistanceComponent,

        MockComponent(
          {
            selector: 'bubble-line-chart-component',
            inputs: [
              'scheme',
              'colorSchemeLine',
              'customColors',
              'results',
              'animations',
              'lineChart',
              'bubbleChart',
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
            ]
          }
        )
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: DyfiService, useValue: dyfiServiceStub}
      ]
    })
    .compileComponents();
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
      component.onDyfiSeries(SampleSeries);
    });
  });
});
