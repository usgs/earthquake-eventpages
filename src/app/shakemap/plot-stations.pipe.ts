import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plotStations'
})
export class PlotStationsPipe implements PipeTransform {

  transform(stations: any, plotX: string, plotY: string): any {
    const plotStations = [];
    stations.forEach(station => {
      const props = station.properties;
      const x = props[plotX];
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

        if (
          props.network === 'DYFI' ||
          props.network === 'INTENSITY' ||
          props.network === 'CIIM' ||
          props.station_type === 'macroseismic'
        ) {
          plotStation.shape = 'circle';
        }


        plotStations.push(plotStation);
      }
    });

    return [{
      class: 'smStations',
      name: 'Stations',
      series: plotStations
    }];
  }

}
