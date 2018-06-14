import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { DyfiService } from '../../core/dyfi.service';
import { EventService } from '../../core/event.service';
import { IntensityVsDistanceComponent } from './intensity-vs-distance.component';

describe('IntensityVsDistanceComponent', () => {
  let component: IntensityVsDistanceComponent;
  let fixture: ComponentFixture<IntensityVsDistanceComponent>;

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
});
