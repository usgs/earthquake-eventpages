import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotAtten'
})
export class PlotAttenPipe implements PipeTransform {

  convert (accs, imt) {
    const converted = [];
    accs.mean.forEach((acc, i) => {
      const point = {
        max: acc + accs.stddev[i],
        min: acc - accs.stddev[i],
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

  transform (attenCurves, distance, imt, gmpe): any {
    if (!attenCurves) {
      return [];
    }

    attenCurves = this.renameAccs(attenCurves);
    const distances = attenCurves.distances[distance];
    const accs = attenCurves.gmpe[gmpe][imt];
    const converted = this.convert(accs, imt);

    const points = [];
    distances.forEach((dist, i) => {
      const point = {
        max: converted[i].max,
        min: converted[i].min,
        name: dist,
        value: converted[i].value,
        x: dist,
        y: converted[i].value
      };
      points.push(point);
    });

    return [
      {
        class: 'smAttenCurves',
        hasRange: true,
        name: 'Regression Prediction',
        rangeOpacity: .2,
        series: points,
        strokeWidth: '3'
      }
  ];
  }
}
