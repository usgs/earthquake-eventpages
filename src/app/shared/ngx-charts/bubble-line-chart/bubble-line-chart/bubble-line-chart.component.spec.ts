import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { BubbleLineChartComponent } from './bubble-line-chart.component';

describe('BubbleLineChartComponent', () => {
  let component: BubbleLineChartComponent;
  let fixture: ComponentFixture<BubbleLineChartComponent>;
  let XDOMAIN, YDOMAIN, BUBBLESERIES, LINESERIES;
  beforeEach(async(() => {
    XDOMAIN = [0, 100];
    YDOMAIN = [0, 100];
    BUBBLESERIES = [
      {
        name: 'bubble series',
        series: [{x: 50, y: 2, value: 2, name: 50, min: 1, max: 3}]
      }
    ];
    LINESERIES = [
      {
        name: 'line series',
        series: [
          {x: 0, y: 10, value: 10, name: 0},
          {x: 10, y: 20, value: 20, name: 10}
        ]
      }
    ];

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

  describe('update', () => {
    it('should run', () => {
      component.update();
    });
  });

  describe('getXScale', () => {
    it('returns a function', () => {
      const xScale = component.getXScale(XDOMAIN, 100);

      expect(xScale(5)).toBe(5);
    });

    it('handles time scale', () => {
      component.scaleType = 'time';
      const xScale = component.getXScale(XDOMAIN, 100);

      expect(xScale(5)).toBe(5);
    });
  });

  describe('getYScale', () => {
    it('returns a function', () => {
      const yScale = component.getYScale(YDOMAIN, 100);

      expect(yScale(5)).toBe(95);
    });
  });

  describe('getXDomain', () => {
    it('Autosets', () => {
      component.bubbleChart = BUBBLESERIES;
      component.lineChart = LINESERIES;
      component.autoScale = true;

      const domain = component.getXDomain();

      expect(domain[0]).toBe(0);
      expect(domain[1]).toBe(50);
    });

    it('Uses max/min x values', () => {
      component.bubbleChart = BUBBLESERIES;
      component.lineChart = LINESERIES;

      component.xScaleMin = -5;
      component.xScaleMax = 100;

      const domain = component.getXDomain();

      expect(domain[0]).toBe(-5);
      expect(domain[1]).toBe(100);
    });

    it('handles time scale', () => {
      component.bubbleChart = BUBBLESERIES;
      component.lineChart = LINESERIES;
      component.scaleType = 'time';

      const domain = component.getXDomain();

      expect(domain[0]).toBe(0);
      expect(domain[1]).toBe(50);
    });
  });

  describe('getYDomain', () => {
    it('Autosets', () => {
      component.bubbleChart = BUBBLESERIES;
      component.lineChart = LINESERIES;
      component.autoScale = true;

      const domain = component.getYDomain();

      expect(domain[0]).toBe(0);
      expect(domain[1]).toBe(20);
    });
  });

  describe('getRDomain', () => {
    it('sets R Domain', () => {
      component.results = [...BUBBLESERIES, ...LINESERIES];
      const domain = component.getRDomain();

      expect(domain[0]).toBe(1);
      expect(domain[1]).toBe(1);

    });
  });

  describe('getBubblePadding', () => {
    it('runs', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.getBubblePadding();
    });
  });

  describe('onActivate', () => {
    it('activates a bubble', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.onActivate(component.bubbleChart[0]);

      expect(component.activeEntries[0].name === component.bubbleChart[0].name);
    });

    it('doesn\'t double activate', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.onActivate(component.bubbleChart[0]);
      component.onActivate(component.bubbleChart[0]);

      expect(component.activeEntries.length === 1);
    });
  });

  describe('onDeactivate', () => {
    it('handles non-activated item', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.onDeactivate(component.bubbleChart[0]);

      expect(component.activeEntries.length === 0);
    });

    it('deactivates item', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.onActivate(component.bubbleChart[0]);
      component.onDeactivate(component.bubbleChart[0]);

      expect(component.activeEntries.length === 0);
    });
  });

  describe('deactivateAll', () => {
    it('runs when no items are activated', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.deactivateAll();
      expect(component.activeEntries.length === 0);
    });

    it('deactivates items', () => {
      component.bubbleChart = BUBBLESERIES;
      component.update();

      component.onActivate(component.bubbleChart[0]);

      component.deactivateAll();
      expect(component.activeEntries.length).toBe(0);
    });
  });

  describe('trackBy', () => {
    it('tracks by name', () => {
      const name = component.trackBy(0, BUBBLESERIES[0]);

      expect(name).toBe(BUBBLESERIES[0].name);
    });
  });

  describe('updateHoveredVertical', () => {
    it('updates hoveredVeritcal', () => {
      component.lineChart = LINESERIES;
      component.update();

      component.updateHoveredVertical(component.lineChart[0].series[0]);
      expect(component.hoveredVertical).toBe(
          component.lineChart[0].series[0].value
      );
    });
  });

  describe('hideCircles', () => {
      it('sets hoveredVertical to null', () => {
        component.lineChart = LINESERIES;
        component.update();

        component.onActivate(component.lineChart[0]);
        component.hideCircles();

        expect(component.hoveredVertical).toBeNull();
        expect(component.activeEntries.length).toBe(0);
      });
  });

  describe('onClick', () => {
    it('runs', () => {
      component.onClick(BUBBLESERIES[0]);
    });
  });

  describe('updateYAxisWidth', () => {
    it('sets y axis width', () => {
      component.updateYAxisWidth({width: 20});

      expect(component.yAxisWidth).toBe(40);
    });
  });

  describe('updateXAxisHeight', () => {
    it('setx x axis height', () => {
      component.updateXAxisHeight({height: 20});

      expect(component.xAxisHeight).toBe(20);
    });
  });
});
