import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  BaseChartComponent,
  calculateViewDimensions,
  ColorHelper,
  LineSeriesComponent,
  ViewDimensions,
  SeriesHorizontal
} from '@swimlane/ngx-charts';
import { scaleLinear, scaleLog, scaleTime } from 'd3-scale';
import { curveLinear } from 'd3-shape';

/**
 * Bubble line chart component for use on maps
 *
 * @param activeEntries
 * @param animations
 * @param autoScale
 * @param bubbleChart
 * @param colorSchemeLine
 * @param customColors
 * @param curve
 * @param errorBarColor
 * @param gradient
 * @param legend
 * @param legendTitle
 * @param lineChart
 * @param maxRadius
 * @param minRadius
 * @param rangeFillOpacity
 * @param roundDomains
 * @param schemeType
 * @param scheme
 * @param showGridLines
 * @param showRightYAxisLabel
 * @param showXAxisLabel;
 * @param showYAxisLabel;
 * @param tooltipDisabled
 * @param xAxis;
 * @param xAxisLabel;
 * @param xScaleMax
 * @param xScaleMin
 * @param xScaleType
 * @param yAxis
 * @param yAxisLabel;
 * @param yAxisLabelRight
 * @param yScaleMin
 * @param yScaleMax
 * @param yScaleType
 * @param yLeftAxisScaleFactor
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'bubble-line-chart-component',
  styleUrls: ['./bubble-line-chart.component.scss'],
  templateUrl: './bubble-line-chart.component.html'
})
export class BubbleLineChartComponent extends BaseChartComponent {
  /* tslint:disable:member-ordering */
  // Ignoring member-ordering here, logical grouping seems more maintainable

  // ngx-chart options
  bubblePadding = [0, 0, 0, 0];
  colors: ColorHelper;
  combinedSeries;
  dims: ViewDimensions;
  hoveredVertical;
  legendOptions: any;
  legendSpacing = 0;
  margin: any[] = [10, 20, 10, 20];
  rDomain: any;
  rScale: any;
  scaledAxis;
  seriesDomain;
  transform: string;
  xAxisHeight = 0;
  xDomain: any;
  xScale: any;
  xSet;
  yAxisWidth = 0;
  yDomain: any;
  yOrientLeft = 'left';
  yScale: any;

  @Input()
  activeEntries: any[] = [];
  @Input()
  animations = true;
  @Input()
  autoScale = false;
  @Input()
  bubbleChart: any[] = [];
  @Input()
  bubbleChartDisplay: any[] = [];
  @Input()
  bubbleChartTooltip = true;
  @Input()
  bubbleTooltipTemplate = null;
  @Input()
  colorSchemeLine: any[];
  @Input()
  customColors: any[] = [];
  @Input()
  customLegendOptions;
  @Input()
  customTicks = false;
  @Input()
  curve = curveLinear;
  @Input()
  errorBarColor = '#000000';
  @Input()
  gradient: boolean;
  @Input()
  legend = false;
  @Input()
  legendTitle = 'Legend';
  @Input()
  legendPosition = 'right';
  @Input()
  lineChart: any[] = [];
  @Input()
  lineChartDisplay: any[] = [];
  @Input()
  lineChartTooltip = true;
  @Input()
  maxRadius = 10;
  @Input()
  minRadius = 3;
  @Input()
  rangeFillOpacity: number;
  @Input()
  roundDomains = false;
  @Input()
  xScaleType = 'linear';
  @Input()
  schemeType: string;
  @Input()
  scheme: any;
  @Input()
  showGridLines = true;
  @Input()
  showRightYAxisLabel;
  @Input()
  showXAxisLabel;
  @Input()
  showYAxisLabel;
  @Input()
  symmetricalYAxis;
  @Input()
  tooltipDisabled = false;
  @Input()
  xAxis;
  @Input()
  xAxisLabel;
  @Input()
  xAxisTicks: number[] = null;
  @Input()
  xScaleMax: number;
  @Input()
  xScaleMin = null;
  @Input()
  yAxis;
  @Input()
  yAxisLabel;
  @Input()
  yAxisLabelRight;
  @Input()
  yAxisTicks: number[] = null;
  @Input()
  yScaleMin = 0;
  @Input()
  yScaleMax: number;
  @Input()
  yScaleType = 'linear';
  @Input()
  yLeftAxisScaleFactor: any;

  @Output()
  activate: EventEmitter<any> = new EventEmitter();
  @Output()
  deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate')
  tooltipTemplate: TemplateRef<any>;
  @ContentChild('seriesTooltipTemplate')
  seriesTooltipTemplate: TemplateRef<any>;

  @ViewChild(LineSeriesComponent)
  lineSeriesComponent: LineSeriesComponent;


  /**
   * Emits deactivate event from all active entries
   */
  deactivateAll () {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }

  /**
   * Filters x/y properties
   * @param xmin
   *     The x axis min
   * @param xmax
   *     The x axis max
   * @param ymin
   *     The y axis min
   * @param ymax
   *     The y axis max
   */
  executeFilter (xmin, xmax, ymin, ymax) {
    for (const series of this.bubbleChart) {
      series.series = series.series.filter(item =>
        (xmin ? item.x > xmin : true) &&
        (xmax ? item.x < xmax : true) &&
        (ymin ? item.y > ymin : true) &&
        (ymax ? item.y < ymax : true)
      );
    }

    for (const series of this.lineChart) {
      series.series = series.series.filter(item =>
        (xmin ? item.x > xmin : true) &&
        (xmax ? item.x < xmax : true) &&
        (ymin ? item.y > ymin : true) &&
        (ymax ? item.y < ymax : true)
      );
    }
  }

  /**
   * Remove custom ticks that fall outside the domain
   */
  filterXTicks() {
    return this.xAxisTicks.filter((tick, pos) => {
      return tick >= this.xDomain[0] &&
          tick <= this.xDomain[1] &&
          this.xAxisTicks.indexOf(tick) === pos;
    });
  }


  /**
   * Remove custom ticks that fall outside the domain
   */
  filterYTicks() {
    return this.yAxisTicks.filter((tick, pos) => {
      return tick >= this.yDomain[0] &&
          tick <= this.yDomain[1] &&
          this.yAxisTicks.indexOf(tick) === pos;
    });
  }

  /**
   * Remove data that fall outside the domain or are hidden
   */
  filterData(resultsSeries) {
    const filteredSeries = [];
    for (const series of resultsSeries) {
      const newSeries = {...series};
      newSeries.series = series.series.filter(point => {
        return point.x >= this.xDomain[0] &&
            point.x <= this.xDomain[1] &&
            point.y >= this.yDomain[0] &&
            point.y <= this.yDomain[1];
      });

      if (!newSeries.hide) {
        filteredSeries.push(newSeries);
      }
    }

    return filteredSeries;
  }

  /**
   * Gets padding on the buble chart
   * @returns {number[]}
   */
  getBubblePadding () {
    let yMin = 0;
    let xMin = 0;
    let yMax = this.dims.height;
    let xMax = this.dims.width;

    for (const s of this.bubbleChart) {
      for (const d of s.series) {
        const r = this.rScale(d.r);
        const cx = this.xScale(d.x);
        const cy = this.yScale(d.y);
        xMin = Math.max(r - cx, xMin);
        yMin = Math.max(r - cy, yMin);
        yMax = Math.max(cy + r, yMax);
        xMax = Math.max(cx + r, xMax);
      }
    }

    xMax = Math.max(xMax - this.dims.width, 0);
    yMax = Math.max(yMax - this.dims.height, 0);

    return [yMin, xMax, yMax, xMin];
  }

  /**
   * Helper function to return all options of chart legend
   * @returns {any}
   */
  getLegendOptions () {
    const opts = {
      colors: this.colors,
      domain: this.seriesDomain,
      icons: this.getLegendIcons(),
      position: this.legendPosition,
      scaleType: this.schemeType,
      title: this.legendTitle
    };

    return opts;
  }

  getLegendIcons () {
    const icons = {};
    for (const series of [...this.lineChart, ...this.bubbleChart]) {
      if (series.icon) {
        icons[series.name] = series.icon;
      }
    }

    return icons;
  }

  /**
   * Helper function to get all R domain values
   */
  getRDomain (): number[] {
    let min = Infinity;
    let max = -Infinity;

    for (const results of this.results) {
      for (const d of results.series) {
        const value = Number(d.r) || 1;
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    }

    if (min === max) {
      // There is only one R value, make a scale from 1-10
      min = 1;
      max = 10;
    }

    return [1, 10];
  }

  /**
   * Helper function to return scale of R values
   * @param domain
   *    All domain values
   * @param range
   *    All y range values
   */
  getRScale (domain, range): any {
    const scale = scaleLinear()
      .range(range)
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  /**
   * Returns the entire series domain numbers
   */
  getSeriesDomain (): any[] {
    const hasSeries = [...this.bubbleChart, ...this.lineChart].filter(
      series => {
          return series.series.length > 0;
        }
      );

    return hasSeries.map(d => d.name );
  }

  /**
   * Returns all set of x domain values
   */
  getXDomain (): any[] {
    const values = [];

    for (const results of this.results) {
      for (const d of results.series) {
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    let min, max;
    if (Number.isInteger(this.xScaleMin) && !this.autoScale) {
      values.push(this.xScaleMin);
      min = this.xScaleMin;
    } else {
      min = Math.min(...values);
    }

    if (Number.isInteger(this.xScaleMax) && !this.autoScale) {
      values.push(this.xScaleMax);
      max = this.xScaleMax;
    } else {
      max = Math.max(...values);
    }

    let domain = [];
    domain = [min, max];

    if (min > 0 && this.xScaleType === 'linear') {
      min = 0;
    } else if (this.xScaleType === 'log') {
      min = 1;
    }

    this.xSet = values;
    return domain;
  }

  /**
   * Helper method to get the xscale of the chart
   * @param domain
   *    All domain numeric values
   * @param width
   *     Width of the chart
   */
  getXScale (domain, width): any {
    let scale;

    if (this.xScaleType === 'time') {
      scale = scaleTime()
        .range([0, width])
        .domain(domain);
    } else if (this.xScaleType === 'linear') {
      scale = scaleLinear()
        .range([0, width])
        .domain(domain);

      if (this.roundDomains) {
        scale = scale.nice();
      }
    } else if (this.xScaleType === 'log') {
      scale = scaleLog()
        .range([0, width])
        .domain(domain);
    }

    return scale;
  }

  /**
   * Returns all set of y domain values
   */
  getYDomain (): any[] {
    let values: number[] = [];

    for (const results of this.results) {
      for (const d of results.series) {
        if (values.indexOf(d.value) < 0) {
          values.push(d.value);
        }
        if (d.min !== undefined) {
          if (values.indexOf(d.min) < 0) {
            values.push(d.min);
          }
        }
        if (d.max !== undefined) {
          if (values.indexOf(d.max) < 0) {
            values.push(d.max);
          }
        }
      }
    }

    let min, max;

    if (this.yScaleMin && !this.autoScale) {
      values.push(this.yScaleMin);
      min = this.yScaleMin;
    } else {
      min = Math.min(...values);
    }

    if (this.yScaleMax && !this.autoScale) {
      values.push(this.yScaleMax);
      max = this.yScaleMax;
    } else {
      max = Math.max(...values);
    }

    if (this.yScaleType === 'log' && max < 10) {
      max = 10;
    }

    if (this.symmetricalYAxis) {
      if (this.yScaleType === 'linear') {
        if (Math.abs(min) > Math.abs(max)) {
          max = Math.abs(min);
        } else {
          min = -Math.abs(max);
        }
      } else if (this.yScaleType === 'log') {
        if (1/max < min) {
          min = 1/max;
        } else {
          max = 1/min;
        }
      }
    }

    if (this.yScaleType === 'log' && min < 0) {
      values = values.sort();
      for (const value of values) {
        if (value > 0) {
          min = value;
          break;
        }
      }
    }

    return [min, max];
  }

  /**
   * Helper method to get the yscale of the chart
   * @param domain
   *    All domain numeric values
   * @param height
   *    Height of the chart
   */
  getYScale (domain, height): any {
    let scale;

    if (this.yScaleType === 'log') {
      if (domain[0] === 0) {
        domain[0] = .0001;
      }

      scale = scaleLog()
        .range([height, 0])
        .domain(domain);
    } else {
      scale = scaleLinear()
        .range([height, 0])
        .domain(domain);
    }

    return this.roundDomains ? scale.nice() : scale;
  }

  @HostListener('mouseleave')
  hideCircles (): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  }

  /**
   * Helper function for activation
   * @param item
   *    The item object, checks for equal object within activeEntries set and
   *      returns the result
   */
  onActivate (item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value
      && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  /**
   * Click listener to emit data
   * @param data
   *     The data to be emitted
   */
  onClick (data) {
    this.select.emit(data);
  }

  /**
   * Helper function for deactivation
   * @param item
   *    The item object, checks for equal object within activeEntries set and
   *      returns result
   */
  onDeactivate (item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value &&
      d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  /**
   * Sets colors on specific domain
   */
  setColors (): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }

    for (const series of [...this.bubbleChart, ...this.lineChart]) {
      if (series.color) {
        this.customColors.push({
          name: series.name,
          value: series.color
        });
      }
    }

    this.colors = new ColorHelper(this.scheme,
        this.schemeType, domain, this.customColors);
  }

  /**
   * Adds a line of symmetry to be plotted
   */
  setLineOfSymmetry (): void {
    const yPos = this.yScaleType === 'log' ? 1 : 0;
    const points = [
      {
        name: this.xDomain[0] + 0,
        value: yPos,
        x: this.xDomain[0] + 0,
        y: yPos
      },
      {
        name: this.xDomain[1],
        value: yPos,
        x: this.xDomain[1],
        y: yPos
      }
    ];

    const symSeries = {
      class: 'symmetry',
      color: '#000',
      name: 'Symmetry',
      series: points,
      strokeWidth: 3
    };

    const newLineChart = [];
    for (const series of this.lineChart) {
      if (series.class !== 'symmetry') {
        newLineChart.push(series);
      }
    }

    newLineChart.push(symSeries);
    this.lineChart = newLineChart;
  }

  /**
   * Helper function to get name property of item
   * @param index
   * @param item
   *    The item to search
   */
  trackBy (index, item): string {
    return item.name;
  }

  /**
   * Update object dimensions, colors
   */
  update (): void {
    if (!this.autoScale) {
      this.executeFilter(
        this.xScaleMin,
        this.xScaleMax,
        this.yScaleMin,
        this.yScaleMax
      );
    }

    // update custom colors to use error bars
    this.customColors.push(
      {name: 'error', value: this.errorBarColor}
    );

    this.results = [...this.lineChart, ...this.bubbleChart];
    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();
    if (this.symmetricalYAxis) {
      this.setLineOfSymmetry();
    }
    this.lineChartDisplay = this.filterData(this.lineChart);
    this.bubbleChartDisplay = this.filterData(this.bubbleChart);

    this.results = [...this.lineChart, ...this.bubbleChart];
    super.update();

    this.dims = calculateViewDimensions({
      height: this.height,
      legendType: this.schemeType,
      margins: this.margin,
      showLegend: this.legend,
      showXAxis: this.xAxis,
      showXLabel: this.showXAxisLabel,
      showYAxis: this.yAxis,
      showYLabel: this.showYAxisLabel,
      width: this.width,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
    });

    if (!this.yAxis) {
      this.legendSpacing = 0;
    } else if (this.showYAxisLabel && this.yAxis) {
      this.legendSpacing = 100;
    } else {
      this.legendSpacing = 40;
    }

    this.rDomain = this.getRDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    this.rScale = this
        .getRScale(this.rDomain, [this.minRadius, this.maxRadius]);

    this.bubblePadding = this.getBubblePadding();
    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  /**
   * Updates the item when hovered on
   * @param item
   *    The item to redraw
   */
  updateHoveredVertical (item): void {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  /**
   * Helper function to update the x axis height of the chart
   * @param height
   */
  updateXAxisHeight ({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  /**
   * Helper function to update the y axis width of the chart
   * @param width
   *    The object width
   */
  updateYAxisWidth ({ width }): void {
    this.yAxisWidth = width + 20;
    this.update();
  }

  /**
   * Returns base-10 ticks for the log axis
   * @param value
   *    Value of the tick
   */
  logTickFormatting (value) {

    const logTicks = [
      .0000001,
      .000001,
      .00001,
      .0001,
      .0001,
      .001,
      .01,
      .1,
      0,
      1,
      10,
      100,
      1000,
      10000,
      100000
    ];

    if (logTicks.indexOf(value) < 0) {
      return '';
    }

    return value;
  }

  /**
   * Returns tick value for the linear axis
   * @param value
   *    The value of the x axis tick
   */
  linearTickFormatting (value) {

    return value;
  }
}
