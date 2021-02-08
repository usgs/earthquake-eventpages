import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Generate alert bars for summary tab, on ground-failure product page
 *
 * @param bins
 *     bins to be plotted on alert bar
 *
 * @param title
 *     alert bar title/header
 *
 * @param units
 *     value units
 *
 * @param value
 *     value to be be plotted on alert bar
 *
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ground-failure-alert-bar',
  styleUrls: ['./alert-bar.component.scss'],
  templateUrl: './alert-bar.component.html'
})
export class AlertBarComponent {
  _bins = [
    {
      color: '#27a83c',
      max: 1,
      min: 0,
      text: 'Little or no'
    },
    {
      color: '#e5e514',
      max: 10,
      min: 1,
      text: 'Limited'
    },
    {
      color: '#f0a216',
      max: 100,
      min: 10,
      text: 'Significant'
    },
    {
      color: '#ba2d1a',
      max: 1000,
      min: 100,
      text: 'Extensive'
    }
  ];
  _error;

  @Input()
  set bins(bins) {
    this._bins = bins;
    for (const bin of bins) {
      if (bin.max > this.maxBin) {
        this.maxBin = bin.max;
      }
      if (bin.min < this.minBin) {
        this.minBin = bin.min;
      }
    }
  }
  get bins() {
    return this._bins;
  }

  @Input()
  set error(std) {
    if (!std || std === 'None') {
      std = '0,0';
    }

    const splitStd = std.split(',');
    this._error = {
      max: parseFloat(splitStd[1]),
      min: parseFloat(splitStd[0])
    };
  }
  get error() {
    return this._error;
  }

  maxBin = 0;
  minBin = 100000;

  @Input()
  title: String = 'Alert Bar Title';

  @Input()
  units: String = 'km²';

  @Input()
  value: number;

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    alert bin
   */
  trackByIndex(index, item) {
    return index;
  }
}
