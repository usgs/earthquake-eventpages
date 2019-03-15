import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotAtten'
})
export class PlotAttenPipe implements PipeTransform {

  exponentiate (accs, imt) {
    accs.mean = accs.mean.map(acc => {
      let exp = Math.exp(acc);
      if (imt === 'pga') {
        exp *= 100;
      }

      return exp;
    });

    return accs;
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
    let accs = attenCurves.gmpe[gmpe][imt];

    if (!accs.processed) {
      if (imt !== 'intensity') {
        accs = this.exponentiate(accs, imt);
      }

      accs.processed = true;
    }

    const points = [];
    distances.forEach((dist, i) => {
      const point = {
        'name': dist,
        'value': accs.mean[i],
        'x': dist,
        'y': accs.mean[i]
      };

      points.push(point);
    });

    return [{
      class: 'smAttenCurves',
      name: 'Residual Predictions',
      series: points,
      strokeWidth: '3'
    }];
  }
}
