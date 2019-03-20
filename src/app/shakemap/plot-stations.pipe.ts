import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotStations'
})
export class PlotStationsPipe implements PipeTransform {

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

  getResidual (props, imt, ratio) {
    const predictions = props.predictions;

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

  transform (
    stations: any,
    plotX: string,
    plotY: string,
    residual=false,
    ratio=false
  ): any {
    const smPredictions = [];
    const smStations = [];
    const dyfiPredictions = [];
    const dyfiStations = [];

    stations.forEach(station => {
      const props = station.properties;
      const y = props[plotY];
      const x = props.distances ? props.distances[plotX] : props.distance;

      const predY = this.getPredictedValue(props, plotY);

      if (x && y) {
        const plotStation = {
          'borderColor': '#000000',
          'name': x,
          'r': 6,
          'shape': 'triangle',
          'station': station,
          'value': y,
          'x': x,
          'y': y
        };

        const prediction = {
          'borderColor': '#000000',
          'name': x,
          'r': 3,
          'shape': 'triangle',
          'station': station,
          'value': predY,
          'x': x,
          'y': predY
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
          prediction.shape = 'circle';
          dyfiStations.push(plotStation);

          if (prediction.value) {
            dyfiPredictions.push(prediction);
          }
        } else {
          smStations.push(plotStation);

          if (prediction.value) {
            smPredictions.push(prediction);
          }
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
      }/*,
      {
        class: 'smStationPredictions',
        icon: {shape: 'triangle', size: 3},
        name: 'Seismic Station Predictions',
        series: residual ? [] : smPredictions
      },
      {
        class: 'dyfiStationPredictions',
        icon: {shape: 'circle', size: 3},
        name: 'DYFI Station Predictions',
        series: residual ? [] : dyfiPredictions
      }
      */
    ];
  }
}
