import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  HostListener,
  OnInit,
  OnChanges,
  ContentChild,
  TemplateRef
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import {
  NgxChartsModule, BaseChartComponent, LineComponent, LineSeriesComponent,
  calculateViewDimensions, ViewDimensions, ColorHelper
 } from '@swimlane/ngx-charts';

import { area, line, curveLinear } from 'd3-shape';
import { scaleBand, scaleLinear, scaleLog, scalePoint, scaleTime } from 'd3-scale';

@Component({
  selector: 'bubble-line-chart-component',
  templateUrl: './bubble-line-chart.component.html',
  styleUrls: ['./bubble-line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BubbleLineChartComponent extends BaseChartComponent  {

  @Input() activeEntries: any[] = [];
  @Input() animations = true;
  @Input() autoScale = false;
  @Input() bubbleChart: any[] = [];
  @Input() colorSchemeLine: any[];
  @Input() customColors: any[] = [];
  @Input() curve = curveLinear;
  @Input() errorBarColor = '#000000';
  @Input() gradient: boolean;
  @Input() legend = false;
  @Input() legendTitle = 'Legend';
  @Input() lineChart: any[] = [];
  @Input() maxRadius = 10;
  @Input() minRadius = 3;
  @Input() rangeFillOpacity: number;
  @Input() roundDomains = false;
  @Input() results: any;
  @Input() scaleType = 'linear';
  @Input() schemeType: string;
  @Input() scheme: any;
  @Input() showGridLines = true;
  @Input() showRightYAxisLabel;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() tooltipDisabled = false;
  @Input() xAxis;
  @Input() xAxisLabel;
  @Input() xScaleMax: number;
  @Input() xScaleMin = 0;
  @Input() yAxis;
  @Input() yAxisLabel;
  @Input() yAxisLabelRight;
  @Input() yAxisTickFormatting: any;
  @Input() yRightAxisTickFormatting: any;
  @Input() yScaleMin = 0;
  @Input() yScaleMax: number;
  @Input() yLeftAxisScaleFactor: any;
  @Input() yRightAxisScaleFactor: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
  @ContentChild('seriesTooltipTemplate') seriesTooltipTemplate: TemplateRef<any>;

  @ViewChild(LineSeriesComponent) lineSeriesComponent: LineSeriesComponent;

  // ngx-chart options
  bubblePadding = [0, 0, 0, 0];
  colors: ColorHelper;
  combinedSeries;
  dims: ViewDimensions;
  filteredDomain;
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

  trackBy (index, item): string {
    return item.name;
  }

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
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      legendType: this.schemeType
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
    if (this.filteredDomain) {
      this.xDomain = this.filteredDomain;
    }


    this.yDomain = this.getYDomain();
    this.rDomain = this.getRDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    this.rScale = this.getRScale(this.rDomain, [this.minRadius, this.maxRadius]);

    this.bubblePadding = this.getBubblePadding();
    this.setColors();
    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  deactivateAll () {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }

  executeFilter (xmin, xmax, ymin, ymax) {
    for (let series of this.bubbleChart) {
      series.series = series.series.filter(item =>
        (xmin ? item.x > xmin : true) &&
        (xmax ? item.x < xmax : true) &&
        (ymin ? item.y > ymin : true) &&
        (ymax ? item.y < ymax : true)
      )
    }

    for (let series of this.lineChart) {
      series.series = series.series.filter(item =>
        (xmin ? item.x > xmin : true) &&
        (xmax ? item.x < xmax : true) &&
        (ymin ? item.y > ymin : true) &&
        (ymax ? item.y < ymax : true)
      )
    }
  }

  @HostListener('mouseleave')
  hideCircles (): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  }

  updateHoveredVertical (item): void {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  getSeriesDomain (): any[] {
    return [...this.bubbleChart, ...this.lineChart]
        .map(d => d.name );
  }

  getXDomain (): any[] {
    let values = [];

    for (const results of [...this.lineChart, ...this.bubbleChart]) {
      for (const d of results.series) {
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    if (!this.autoScale) {
      if (this.xScaleMin) {
        values.push(this.xScaleMin);
      }
      if (this.xScaleMax) {
        values.push(this.xScaleMax);
      }
    }

    let domain = [];

    const min = Math.min(...values);
    const max = Math.max(...values);
    domain = [min, max];

    this.xSet = values;
    return domain;
  }

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
    if (!this.autoScale) {
      if (this.yScaleMin) {
        values.push(this.yScaleMin);
        min = this.yScaleMin;
      } else {
        let min = Math.min(...values);
      }

      if (this.yScaleMax) {
        values.push(this.yScaleMax);
        max = this.yScaleMax;
      } else {
        const max = Math.max(...values);
      }
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

  getYScale (domain, height): any {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

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

  onClick (data) {
    this.select.emit(data);
  }

  setColors (): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }
    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions () {
    const opts = {
      scaleType: this.schemeType,
      colors: undefined,
      domain: [],
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

  updateYAxisWidth ({ width }): void {
    this.yAxisWidth = width + 20;
    this.update();
  }

  updateXAxisHeight ({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate (item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate (item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  getRScale (domain, range): any {
    const scale = scaleLinear()
      .range(range)
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

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

  xAxisTickFormatting (value) {
    return value
  }
}
