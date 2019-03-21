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
            'legendTitle',
            'showGridLines',
            'showXAxisLabel',
            'showYAxisLabel',
            'showRightYAxisLabel',
            'symmetricalAbout',
            'symmetricalYAxis',
            'symmetricalYAxisLegend',
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

        MockPipe('plotAtten'),
        MockPipe('plotStations'),
        MockPipe('sharedGetContent'),
        MockPipe('sharedProductContent')
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

  describe('setImt', () => {
    it('switches to log for PGA and PGV and Linear for Intensity', () => {
      let option;

      component.yScaleType = 'linear';
      option = {type: 'pga'};
      component.setImt(option);
      expect(component.yScaleType).toBe('log');

      component.yScaleType = 'linear';
      option = {type: 'pgv'};
      component.setImt('option');
      expect(component.yScaleType).toBe('log');

      component.yScaleType = 'log';
      option = {type: 'intensity'};
      component.setImt(option);
      expect(component.yScaleType).toBe('linear');
    });

    it('switches to log for residual ratio for all IMTs', () => {
      let option;
      component.residual = true;
      component.ratio = true;

      component.yScaleType = 'linear';
      option = {type: 'pga'};
      component.setImt(option);
      expect(component.yScaleType).toBe('log');

      component.yScaleType = 'linear';
      option = {type: 'pgv'};
      component.setImt('option');
      expect(component.yScaleType).toBe('log');

      component.yScaleType = 'linear';
      option = {type: 'intensity'};
      component.setImt(option);
      expect(component.yScaleType).toBe('log');
    });

    it('Uses linear for all IMTs in residuals', () => {
      let option;
      component.residual = true;
      component.ratio = false;

      component.yScaleType = 'log';
      option = {type: 'pga'};
      component.setImt(option);
      expect(component.yScaleType).toBe('linear');

      component.yScaleType = 'log';
      option = {type: 'pgv'};
      component.setImt('option');
      expect(component.yScaleType).toBe('linear');

      component.yScaleType = 'log';
      option = {type: 'intensity'};
      component.setImt(option);
      expect(component.yScaleType).toBe('linear');
    });
  });

  describe('residualToggle', () => {
    it('defaults to linear for residual plot', () => {
      component.residual = true;
      component.ratio = false;
      component.toggleResidual();

      expect(component.yScaleType).toBe('linear');
    });

    it('defaults to linear for MMI turning off residual', () => {
      component.residual = false;
      component.ratio = false;
      component.plotting.y.type = 'intensity';
      component.toggleResidual();

      expect(component.yScaleType).toBe('linear');
    });

    it('Switches to log for PGA with residual off', () => {
      component.residual = false;
      component.ratio = false;
      component.plotting.y.type = 'pga';
      component.toggleResidual();

      expect(component.yScaleType).toBe('log');
    });

    it('Switches to log for PGV with residual off', () => {
      component.residual = false;
      component.ratio = false;
      component.plotting.y.type = 'pgv';
      component.toggleResidual();

      expect(component.yScaleType).toBe('log');
    });
  });
});
