import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { AnalysisComponent } from './analysis.component';
import { StationService } from '@core/station.service';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

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
        AnalysisComponent,

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
            'symetricalYAxis',
            'xAxisLabel',
            'yAxisLabel',
            'yScaleMin',
            'yScaleMax',
            'xScaleMin',
            'xScaleMax',
            'xAxisTicks',
            'xScaleType',
            'yScaleType'
          ],
          selector: 'bubble-line-chart-component'
        }),
        MockComponent({
          inputs: [
            'channels',
            'expanded',
            'station'
          ],
          selector: 'shared-station'
        }),

        MockPipe('plotStations')
      ],
      imports: [
        FormsModule,
        MatSelectModule,
        MatSlideToggleModule,
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
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
