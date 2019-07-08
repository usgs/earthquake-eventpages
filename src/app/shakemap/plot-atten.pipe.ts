import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotAtten'
})
export class PlotAttenPipe implements PipeTransform {

  /**
   * Converts accelerations to %g or cm/s and returns an array
   *
   * @param accs
   *    Accelerations grabbed from the gmpe.soil/gmpe.rock properties of
   *    the attenuation curves product
   * @param imt
   *    Which IMT is going to be plotted
   */
  convert (accs, imt) {
    const converted = [];
    accs.mean.forEach((acc, i) => {
      const point = {
        max: acc + accs.stddev[i],
        min: acc - accs.stddev[i],
        stddev: accs.stddev[i],
        value: acc
      };

      if (imt !== 'intensity') {
        point.max = Math.exp(point.max);
        point.min = Math.exp(point.min);
        point.value = Math.exp(point.value);
      }

      if (imt === 'pga') {
        point.value *= 100;
        point.max *= 100;
        point.min *= 100;
      }

      converted.push(point);
    });

    return converted;
  }

  /**
   * Rename the IMTs to match the station list
   *
   * @param attenCurves
   */
  renameAccs (attenCurves) {
    const rename = {
      MMI: 'intensity',
      PGA: 'pga',
      PGV: 'pgv',
      'SA(0.3)': 'psa03',
      'SA(1.0)': 'psa10',
      'SA(3.0)': 'psa30'
    };

    for (const name of Object.keys(rename)) {
      for (const gmpe of Object.keys(attenCurves.gmpe)) {
        attenCurves.gmpe[gmpe][rename[name]] = attenCurves.gmpe[gmpe][name];
      }
    }
    return attenCurves;
  }

  /**
   * Convert shakemap attenuation curves into a plottable series
   *
   * @param attenCurves
   *    Shakemap attenuation curves product
   * @param distance
   *    Type of distance
   * @param imt
   *    Which IMT to use
   * @param plotGmpe
   *    'soil' or 'rock' GMPE with current configurations
   */
  transform (attenCurves, distance, imt, plotGmpe, residual, ratio): any {
    if (!attenCurves) {
      return [];
    }

    const series = [];
    for (const gmpe of Object.keys(attenCurves.gmpe)) {
      attenCurves = this.renameAccs(attenCurves);
      const distances = attenCurves.distances[distance];
      const accs = attenCurves.gmpe[gmpe][imt];
      const converted = this.convert(accs, imt);

      const points = [];
      distances.forEach((dist, i) => {
        let value = converted[i].value;
        let max = converted[i].max;
        let min = converted[i].min;
        const stddev = converted[i].stddev;

        if (residual && ratio) {
          max = max / value;
          min = min / value;
          value = 1;
        } else if (residual) {
          max = stddev;
          min = -stddev;
          value = 0;
        }

        const point = {
          max: max,
          min: min,
          name: dist,
          value: value,
          x: dist,
          y: value
        };
        points.push(point);
      });

      series.push({
        class: `smAttenCurves-${gmpe}`,
        hasRange: true,
        hide: plotGmpe === gmpe ? false : true,
        name: 'Prediction (+/- 1 std dev)',
        rangeOpacity: .2,
        series: points,
        strokeWidth: '3'
      });
    }

    return series;
  }
}
