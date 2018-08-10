import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { BubbleSeriesComponent } from './bubble-series.component';


describe('BubbleSeriesComponent', () => {
  let component: BubbleSeriesComponent;
  let fixture: ComponentFixture<BubbleSeriesComponent>;
  let BUBBLESERIES, colorsStub;

  beforeEach(async(() => {
    BUBBLESERIES = {
      name: 'bubble series',
      series: [{x: 50, y: 2, value: 2, name: 50, min: 1, max: 3}]
    };

    colorsStub = {
      scaleType: 'ordinal',
      getColor: (item) => '#000000'
    };

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
              'tooltipContext',
              'path'
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

  describe('getCircles', () => {
    it('handles null circles', () => {
      const bubbleSeries = {name: 'no data', series: [{}]};

      component.data = bubbleSeries;
      const circles = component.getCircles();
      expect(circles.length).toBe(0);
    });

    it('should return circles', () => {
      component.data = BUBBLESERIES;

      // some properties come from parent... imitate simple case
      component.rScale = (r) => r;
      component.yScale = (y) => y;
      component.xScale = (x) => x;
      component.colors = colorsStub;
      component.activeEntries = [];

      const circles = component.getCircles();

      expect(circles.length).toBe(1);
    });

    it('works with linear scale', () => {
      component.data = BUBBLESERIES;

      // some properties come from parent... imitate simple case
      component.rScale = (r) => r;
      component.yScale = (y) => y;
      component.xScale = (x) => x;
      component.colors = colorsStub;
      component.activeEntries = [];

      component.xScaleType = 'linear';
      component.yScaleType = 'linear';
      component.colors.scaleType = 'linear';

      const circles = component.getCircles();

      expect(circles.length).toBe(1);
    });

    it('works with series deactivated', () => {
      component.data = BUBBLESERIES;

      // some properties come from parent... imitate simple case
      component.rScale = (r) => r;
      component.yScale = (y) => y;
      component.xScale = (x) => x;
      component.colors = colorsStub;

      component.activeEntries = [{name: 'not this series!'}];
      const circles = component.getCircles();

      expect(circles.length).toBe(1);
    });
  });
});
