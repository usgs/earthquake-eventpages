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
  ViewDimensions
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
 * @param results
 * @param scaleType
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
 * @param yAxis
 * @param yAxisLabel;
 * @param yAxisLabelRigh
 * @param yAxisTickFormatting
 * @param yRightAxisTickFormatting
 * @param yScaleMin
 * @param yScaleMax
 * @param yLeftAxisScaleFactor
 * @param yRightAxisScaleFactor
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
  bubbleChartTooltip = true;
  @Input()
  colorSchemeLine: any[];
  @Input()
  customColors: any[] = [];
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
  lineChart: any[] = [];
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
  results: any;
  @Input()
  scaleType = 'linear';
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
  yAxisTickFormatting: any;
  @Input()
  yRightAxisTickFormatting: any;
  @Input()
  yScaleMin = 0;
  @Input()
  yScaleMax: number;
  @Input()
  yLeftAxisScaleFactor: any;
  @Input()
  yRightAxisScaleFactor: any;

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
    return this.xAxisTicks.filter(tick => {
      return tick >= this.xDomain[0] && tick <= this.xDomain[1];
    });
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
      colors: undefined,
      domain: [],
      scaleType: this.schemeType,
      title: undefined
    };
    if (opts.scaleType === 'ordinal') {
      opts.domain = this.seriesDomain;
      opts.colors = this.colors;
      opts.title = this.legendTitle;
    } else {
      opts.domain = this.seriesDomain;
      opts.colors = this.colors.scale;
    }
    return opts;
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

    return [min, max];
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
    return [...this.bubbleChart, ...this.lineChart]
        .map(d => d.name );
  }

  /**
   * Returns 6 values evenly spaced on the log axis
   */
  getXAxisTicks () {
    let lowerDomain = this.xDomain[0];
    const upperDomain = this.xDomain[1];

    if (lowerDomain < 1) {
      lowerDomain = 1;
    }

    const logLower = Math.log(lowerDomain);
    const logUpper = Math.log(upperDomain);

    const interval = (upperDomain - lowerDomain) / 6;
    const logInterval = (logUpper - logLower) / 6;

    const mod = interval > 15 ? 10 : interval > 10 ? 5 : 1;
    let val = logLower + logInterval;
    const between = [];
    let tick;
    while (val < logUpper) {
      // round the tick by some modifying number (5 or 10)
      tick = Math.round(Math.E ** val / mod) * mod;
      between.push(tick);
      val += logInterval;
    }

    return [...between];
  }

  /**
   * Returns all set of x domain values
   */
  getXDomain (): any[] {
    const values = [];

    for (const results of [...this.lineChart, ...this.bubbleChart]) {
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

    if (this.scaleType === 'time') {
      scale = scaleTime()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'linear') {
      scale = scaleLinear()
        .range([0, width])
        .domain(domain);

      if (this.roundDomains) {
        scale = scale.nice();
      }
    } else if (this.scaleType === 'log') {
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
    const values = [];

    for (const results of [...this.lineChart, ...this.bubbleChart]) {
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

    if (this.yRightAxisScaleFactor) {
      const minMax = this.yRightAxisScaleFactor(min, max);
      return [Math.min(0, minMax.min), minMax.max];
    } else {
      if (this.autoScale) {
        min = Math.min(0, min);
      }
      return [min, max];
    }
  }

  /**
   * Helper method to get the yscale of the chart
   * @param domain
   *    All domain numeric values
   * @param height
   *    Height of the chart
   */
  getYScale (domain, height): any {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(domain);

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
    this.colors = new ColorHelper(this.scheme,
        this.schemeType, domain, this.customColors);
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

    this.combinedSeries = this.results;
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

    // line chart
    this.xDomain = this.getXDomain();

    if (!this.xAxisTicks) {
      this.xAxisTicks = this.getXAxisTicks();
    }

    this.xAxisTicks = this.filterXTicks();

    this.yDomain = this.getYDomain();
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
   * Returns the tick format value of the chart
   * @param value
   *    The value of the x axis tick
   */
  xAxisTickFormatting (value) {
    return value;
  }
}
