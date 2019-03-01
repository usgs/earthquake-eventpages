import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotStations'
})
export class PlotStationsPipe implements PipeTransform {

  getResidual(props, imt) {
    const predictions = props.predictions;

    let residual = 0;
    if (props[imt]) {
      const measured = props[imt];
      // rename imt to match predictions entry (only for intensity)
      imt = 'intensity' ? 'mmi' : imt;

      for (const pred of predictions) {
        if (pred.name === imt) {
          residual = measured - pred.value;
        }
      }
    }

    return Math.abs(residual);
  }

  transform(stations: any, plotX: string, plotY: string, residual=false): any {
    const smStations = [];
    const dyfiStations = [];
    stations.forEach(station => {
      const props = station.properties;
      const x = props.distances[plotX];
      const y = props[plotY];

      if (x && y) {
        const plotStation = {
          'borderColor': '#000000',
          'name': x,
          'r': 5,
          'shape': 'triangle',
          'station': station,
          'value': y,
          'x': x,
          'y': y
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
          dyfiStations.push(plotStation);
        } else {
          smStations.push(plotStation);
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
      }
    ];
  }
}
