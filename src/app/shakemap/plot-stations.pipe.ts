import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotStations'
})
export class PlotStationsPipe implements PipeTransform {

  getPredictedValue (props, imt) {
    const predictions = props.predictions;
    imt = 'intensity' ? 'mmi' : imt;

    for (const pred of predictions) {
      if (pred.name === imt) {
        return pred.value;
      }
    }

    return null;
  }

  getResidual (props, imt) {
    const predictions = props.predictions;

    let residual = 0;
    if (props[imt]) {
      const measured = props[imt];
      // rename imt to match predictions entry (only for intensity)
      imt = 'intensity' ? 'mmi' : imt;
      const predicted = this.getPredictedValue(props, imt);

      residual = measured - predicted;
    }

    return residual;
  }

  transform (stations: any, plotX: string, plotY: string, residual=false): any {
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
          const res = this.getResidual(station.properties, plotY);
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
          dyfiPredictions.push(prediction);
        } else {
          smStations.push(plotStation);
          smPredictions.push(prediction);
        }
      }
    });

    return [
      {
      class: 'smStations',
      name: 'Seismic Stations',
      series: smStations,
      shape: 'triangle'
      },
      {
        class: 'dyfiStations',
        name: 'DYFI Stations',
        series: dyfiStations,
        shape: 'circle'
      },
      {
        class: 'smStationPredictions',
        name: 'Seismic Station Predictions',
        series: residual ? [] : smPredictions,
        shape: 'triangle'
      },
      {
        class: 'dyfiStationPredictions',
        name: 'DYFI Station Predictions',
        series: residual ? [] : dyfiPredictions,
        shape: 'circle'
      }
    ];
  }
}
