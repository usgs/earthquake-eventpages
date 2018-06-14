import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { LineChartComponent } from './line-chart.component';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LineChartComponent,

        MockComponent(
          {
            selector: 'ngx-charts-chart',
            inputs: [
              'view',
              'showLegend',
              'legendOptions',
              'activeEntries',
              'animations'
            ]
          }
        ),
        MockComponent(
          {
            selector: ':svg:g',
            inputs: [
              'xScale',
              'yScale',
              'xScaleType',
              'yScaleType',
              'xAxisLabel',
              'yAxisLabel',
              'rScale',
              'xDomain',
              'yDomain',
              'xDomainType',
              'colors',
              'data',
              'activeEntries',
              'scaleType',
              'curve',
              'rangeFillOpacity',
              'animations',
              'dims',
              'xSet',
              'tooltipTemplate',
              'tooltipDisabled',
              'results',
              'visibleValue',
              'showLabel',
              'labelText',
              'tickFormatting',
              'yOrient',
              'showGridLines',
              'strokeWidth',
              'hasRange',
              'cx',
              'cy',
              'r',
              'stroke',
              'fill',
              'pointerEvents',
              'classNames',
              'tooltipType',
              'tooltipPlacement',
              'tooltipTitle',
              'tooltipContext',
              'ticks',
              'referenceLines',
              'showRefLines',
              'showRefLabels',
              'view',
              'height',
              'scheme',
              'customColors',
              'legend'
            ]
          }
        )
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
