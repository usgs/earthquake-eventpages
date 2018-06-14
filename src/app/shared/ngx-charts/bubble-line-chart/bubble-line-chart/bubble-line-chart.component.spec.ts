import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { BubbleLineChartComponent } from './bubble-line-chart.component';

describe('BubbleLineChartComponent', () => {
  let component: BubbleLineChartComponent;
  let fixture: ComponentFixture<BubbleLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BubbleLineChartComponent,

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
              'showGridLines'
            ]
          }
        )
      ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
