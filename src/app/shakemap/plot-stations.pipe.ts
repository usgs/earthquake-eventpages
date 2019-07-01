import { Pipe, PipeTransform } from '@angular/core';

import { RomanPipe } from '@shared/roman.pipe';

@Pipe({
  name: 'plotStations'
})
export class PlotStationsPipe implements PipeTransform {

  /**
   * Get the predicted IMT value for a station
   *
   * @param props
   *    A station's properties attribute
   * @param imt
   *    Which IMT to use
   */
  getPredictedValue (props, imt) {
    const predictions = props.predictions;
    if (!predictions) {
      return null;
    }

    imt = imt === 'intensity' ? 'mmi' : imt;

    for (const pred of predictions) {
      if (pred.name === imt) {
        return pred.value;
      }
    }

    return null;
  }

  /**
   * Product the residual for a given station
   *
   * @param props
   *    A station's properties attribute
   * @param imt
   *    Which IMT to use
   * @param ratio
   *    Produce a ratio instead of a residual
   */
  getResidual (props, imt, ratio) {
    let residual = 0;
    if (props[imt]) {
      const measured = props[imt];
      // rename imt to match predictions entry (only for intensity)
      imt = imt === 'intensity' ? 'mmi' : imt;
      const predicted = this.getPredictedValue(props, imt);

      if (ratio) {
        residual = measured / predicted;
      } else {
        if (imt !== 'mmi') {
          residual = Math.log(measured) - Math.log(predicted);
        } else {
          residual = measured - predicted;
        }
      }
    }

    return residual;
  }

  /**
   * Transforms the stationlist json into a plottable series
   *
   * @param stations
   *    As prepared by the station service
   * @param plotX
   *    Whcih distance value to plot
   * @param plotY
   *    Which IMT to plot
   * @param residual
   *    Produce residuals for the given IMT instead of measured value
   * @param ratio
   *    Produce ratios for the given IMT instead of a measured value
   */
  transform (
    stations: any,
    plotX: string,
    plotY: string,
    residual=false,
    ratio=false
  ): any {
    const smStations = [];
    const dyfiStations = [];

    const romanPipe = new RomanPipe();

    stations.forEach(station => {
      const props = station.properties;
      const y = props[plotY];
      const x = props.distances ? props.distances[plotX] : props.distance;

      if (x && y) {
        const plotStation = {
          'borderColor': '#000000',
          'classNames': [`mmi${romanPipe.transform(props.intensity)}`],
          'name': x,
          'r': 4,
          'shape': 'triangle',
          'station': station,
          'value': y,
          'x': x,
          'y': y
        };

        if (residual) {
          const res = this.getResidual(station.properties, plotY, ratio);
          plotStation.y = res;
          plotStation.value = res;
        }

        if (
          props.network === 'DYFI' ||
          props.network === 'INTENSITY' ||
          props.network === 'CIIM' ||
          props.station_type === 'macroseismic'
        ) {
          plotStation.shape = 'circle';
          dyfiStations.push(plotStation);
        } else {
          smStations.push(plotStation);
        }
      }
    });

    return [
      {
      class: 'smStations',
      icon: {shape: 'triangle', size: 5},
      name: 'Seismic Stations',
      series: smStations
      },
      {
        class: 'dyfiStations',
        icon: {shape: 'circle', size: 5},
        name: 'DYFI Stations',
        series: dyfiStations
      }
    ];
  }
}
