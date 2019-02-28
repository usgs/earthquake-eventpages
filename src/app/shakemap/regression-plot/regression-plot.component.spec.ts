import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSelectModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { RegressionPlotComponent } from './regression-plot.component';
import { StationService } from '@core/station.service';

describe('RegressionPlotComponent', () => {
  let component: RegressionPlotComponent;
  let fixture: ComponentFixture<RegressionPlotComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of({})
    };

    const stationServiceStub = {
      getStations: jasmine.createSpy('getStations::get'),
      stationJson$: of({})
    };
    TestBed.configureTestingModule({
      declarations: [
        RegressionPlotComponent,

        MockComponent({
          inputs: [
            'autoScale',
            'scheme',
            'colorSchemeLine',
            'customColors',
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
            'scaleType'
          ],
          selector: 'bubble-line-chart-component'
        }),

        MockPipe('plotStations')
      ],
      imports: [
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: StationService, useValue: stationServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegressionPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
