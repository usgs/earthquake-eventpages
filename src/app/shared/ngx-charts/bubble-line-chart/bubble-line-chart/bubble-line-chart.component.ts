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
 
import { getScaleType, getDomain, getScale } from '../../bubble-chart/bubble-chart.utils';
import { area, line, curveLinear } from 'd3-shape';
import { scaleBand, scaleLinear, scalePoint, scaleTime } from 'd3-scale';

@Component({
  selector: 'bubble-line-chart-component',
  template:  `
    <ngx-charts-chart
      [view]="[width + legendSpacing, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:g [attr.transform]="transform" class="line-chart chart">
        <svg:g [attr.clip-path]="clipPath">
          <svg:g *ngFor="let series of lineChart; trackBy:trackBy">
            <svg:g ngx-charts-line-series
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [scaleType]="scaleType"
              [curve]="curve"
              [rangeFillOpacity]="rangeFillOpacity"
              [animations]="animations"
            />
          </svg:g>
          <svg:g ngx-charts-tooltip-area
            *ngIf="!tooltipDisabled"
            [dims]="dims"
            [xSet]="xSet"
            [xScale]="xScale"
            [yScale]="yScale"
            [results]="combinedSeries"
            [colors]="colors"
            [tooltipDisabled]="tooltipDisabled"
            (hover)="updateHoveredVertical($event)"
          />
          <svg:g *ngFor="let series of lineChart">
            <svg:g ngx-charts-circle-series
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [scaleType]="scaleType"
              [visibleValue]="hoveredVertical"
              [activeEntries]="activeEntries"
              [tooltipDisabled]="tooltipDisabled"
              (select)="onClick($event, series)"
              (activate)="onActivate($event)"
              (deactivate)="onDeactivate($event)"
            />
          </svg:g>
        </svg:g>
      </svg:g>
      <svg:g [attr.transform]="transform" class="bubble-chart chart">
          <svg:g ngx-charts-x-axis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [tickFormatting]="xAxisTickFormatting"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [yOrient]="yOrientLeft"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showRightYAxisLabel"
          [labelText]="yAxisLabelRight"
          [tickFormatting]="yRightAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <ng-container *ngIf="bubbleChart as bubbleChart">
          <svg:g [attr.clip-path]="clipPath">
            <svg:g
                *ngFor="let series of bubbleChart; trackBy:trackBy">
              <svg:g ngx-charts-bubble-series
                [xScale]="xScale"
                [yScale]="yScale"
                [rScale]="rScale"
                [xDomain]="xDomain"
                [xScaleType]="scaleType"
                [yScaleType]="scaleType"
                [xAxisLabel]="xAxisLabel"
                [yAxisLabel]="yAxisLabel"
                [colors]="colors"
                [data]="series"
                [activeEntries]="activeEntries"
                [tooltipDisabled]="tooltipDisabled"
                [tooltipTemplate]="tooltipTemplate"
                (select)="onClick($event, series)"
                (activate)="onActivate($event)"
                (deactivate)="onDeactivate($event)" />
            </svg:g>
          </svg:g>
        </ng-container>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['./bubble-line-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BubbleLineChartComponent extends BaseChartComponent  {

  @ViewChild(LineSeriesComponent) lineSeriesComponent: LineSeriesComponent;

  @Input() curve: any = curveLinear;
  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() showRightYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() maxRadius = 10;
  @Input() minRadius = 3;
  @Input() yAxisLabelRight;
  @Input() tooltipDisabled: boolean = false;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() xAxisTickFormatting: any;
  @Input() yAxisTickFormatting: any;
  @Input() yRightAxisTickFormatting: any;
  @Input() roundDomains: boolean = false;
  @Input() colorSchemeLine: any[];
  @Input() autoScale;
  @Input() lineChart: any;
  @Input() bubbleChart: any;
  @Input() yLeftAxisScaleFactor: any;
  @Input() yRightAxisScaleFactor: any;
  @Input() rangeFillOpacity: number;
  @Input() animations: boolean = true;
  @Input() customColors: any[] = [];
  @Input() errorBarColor = '#000000';

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
  @ContentChild('seriesTooltipTemplate') seriesTooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  rScale: any;
  xDomain: any;
  yDomain: any;
  rDomain: any;
  transform: string;
  colors: ColorHelper;
  margin: any[] = [10, 20, 10, 20];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  legendOptions: any;
  scaleType = 'linear';
  seriesDomain;
  scaledAxis;
  combinedSeries;
  xSet;
  filteredDomain;
  hoveredVertical;
  yOrientLeft = 'left';
  yOrientRight = 'right';
  legendSpacing = 0;
  bubblePadding = [0, 0, 0, 0];
  bandwidth;
  barPadding = 8;

  trackBy(index, item): string {
    return item.name;
  }

  update(): void {

    // update custom colors to use error bars
    this.customColors.push(
      {name: 'error', value: this.errorBarColor}
    );
    this.combinedSeries = [...this.bubbleChart, ...this.lineChart];
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

  deactivateAll() {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  }

  updateHoveredVertical(item): void {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  updateDomain(domain): void {
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScale = this.getXScale(this.xDomain, this.dims.width);
  }

  getSeriesDomain(): any[] {
    return [...this.bubbleChart, ...this.lineChart]
        .map((d) => { return d.name });
  }

  isDate(value): boolean {
    if (value instanceof Date) {
      return true;
    }

    return false;
  }

  getScaleType(values): string {
    let date = true;
    let num = true;

    for (const value of values) {
      if (!this.isDate(value)) {
        date = false;
      }

      if (typeof value !== 'number') {
        num = false;
      }
    }

    if (date) return 'time';
    if (num) return 'linear';
    return 'ordinal';
  }

  getXDomain(): any[] {
    let values = [];

    for (const results of [...this.lineChart, ...this.bubbleChart]) {
      for (const d of results.series) {
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    this.scaleType = this.getScaleType(values);
    let domain = [];

    if (this.scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }

    this.xSet = values;
    return domain;
  }

  getYDomain(): any[] {
    const domain = [];

    for (const results of [...this.lineChart, ...this.bubbleChart]) {
      for (const d of results.series) {
        if (domain.indexOf(d.value) < 0) {
          domain.push(d.value);
        }
        if (d.min !== undefined) {
          if (domain.indexOf(d.min) < 0) {
            domain.push(d.min);
          }
        }
        if (d.max !== undefined) {
          if (domain.indexOf(d.max) < 0) {
            domain.push(d.max);
          }
        }
      }
    }

    let min = Math.min(...domain);
    const max = Math.max(...domain);
    if (this.yRightAxisScaleFactor) {
      const minMax = this.yRightAxisScaleFactor(min, max);
      return [Math.min(0, minMax.min), minMax.max];
    } else {
      min = Math.min(0, min);
      return [min, max];
    }
  }

  getXScaleBubble(domain, width): any {
    return getScale(domain, [this.bubblePadding[3], width], this.scaleType, this.roundDomains);
  }

  getXScale(domain, width): any {
    let scale;
    if (this.bandwidth === undefined) {
      this.bandwidth = (this.dims.width - this.barPadding);
    }

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
    } else if (this.scaleType === 'ordinal') {
      scale = scalePoint()
        .range([this.bandwidth / 2, width - this.bandwidth / 2])
        .domain(domain);
    }

    return scale;
  }

  getYScale(domain, height): any {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getYScaleBubble(): any {
    this.yDomain = this.getYDomain();
    const scale = scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);
    return this.roundDomains ? scale.nice() : scale;
  }

  getRDomain(): number[] {
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

  onClick(data) {
    this.select.emit(data);
  }

  setColors(): void {
    let domain;
    if (this.schemeType === 'ordinal') {
      domain = this.xDomain;
    } else {
      domain = this.yDomain;
    }
    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions() {
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

  updateLineWidth(width): void {
    this.bandwidth = width;
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width + 20;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    if (idx > -1) {
      return;
    }

    this.activeEntries = [ item, ...this.activeEntries ];
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  getRScale(domain, range): any {
    const scale = scaleLinear()
      .range(range)
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getBubblePadding() {
    let yMin = 0;
    let xMin = 0;
    let yMax = this.dims.height;
    let xMax = this.dims.width;

    for (const s of this.bubbleChart) {
      for (const d of s.series) {
        const r = this.rScale(d.r);
        const cx = (this.scaleType === 'linear') ? this.xScale(Number(d.x)) : this.xScale(d.x);
        const cy = (this.scaleType === 'linear') ? this.yScale(Number(d.y)) : this.yScale(d.y);
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
}