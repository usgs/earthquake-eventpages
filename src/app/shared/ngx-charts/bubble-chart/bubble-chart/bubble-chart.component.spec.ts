import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { BubbleChartComponent } from './bubble-chart.component';

describe('BubbleChartComponent', () => {
  let component: BubbleChartComponent;
  let fixture: ComponentFixture<BubbleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BubbleChartComponent,

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
              'ticks'
            ]
          }
        )
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
