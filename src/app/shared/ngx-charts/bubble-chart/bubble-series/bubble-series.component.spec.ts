import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { BubbleSeriesComponent } from './bubble-series.component';

describe('BubbleSeriesComponent', () => {
  let component: BubbleSeriesComponent;
  let fixture: ComponentFixture<BubbleSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BubbleSeriesComponent,

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
              'tooltipContext'
            ]
          }
        )
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
