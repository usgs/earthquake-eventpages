import * as L from 'leaflet';

import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';
import { FormatterService } from '../../core/formatter.service';
import { LocationPipe } from '../location.pipe';
import { NumberPipe } from '../number.pipe';
import { RomanPipe } from '../roman.pipe';
import { StationService } from '../../core/station.service';

const ShakemapStationsOverlay = AsynchronousGeoJSONOverlay.extend({

  id: 'shakemap-stations',
  title: 'Shakemap Stations',
  legend: null,
  locationPipe: null,
  numberPipe: null,
  romanPipe: new RomanPipe(),

  initialize: function (product) {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    const formatter = new FormatterService();
    this.locationPipe = new LocationPipe(formatter);
    this.numberPipe = new NumberPipe(formatter);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    return product.contents['download/stationlist.json'] ?
        product.contents['download/stationlist.json'].url : null;
  },

  pointToLayer: function (feature, latlng) {
    const props = feature.properties;
    const intensity = this.romanPipe.transform(props.intensity);
    let marker;

    if (props.network === 'DYFI' ||
        props.network === 'INTENSITY' ||
        props.station_type === 'macroseismic') {

      // create a marker for a DYFI station
      marker = L.marker(latlng, {
        icon: L.divIcon({
          className: `station-overlay-dyfi-layer-icon mmi${intensity}`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          popupAnchor: [0, 0]
        })

      });
    } else {

      // create a marker for a seismic station
      marker = L.marker(latlng, {
        icon: L.divIcon({
          className: `station-overlay-station-layer-icon station-mmi${intensity}`,
          iconSize: [14, 10],
          iconAnchor: [7, 8],
          popupAnchor: [0, -4]
        })
      });

    }

    // Add event listener to generate a popup when the station is clicked
    marker.on('click', this.generatePopup, this);
    return marker;
  },

  parse: function (data) {
    // parse if needed
    data = (typeof data === 'string' ? JSON.parse(data) : data);

    // use StationService to parse stationlist.json
    const stationService = new StationService(this.httpClient);
    data = stationService.translate(data);
    return data;
  },

  generatePopup: function (event) {
    const marker = event.target;
    const popupContent = this.generatePopupContent(marker.feature);

    const options = { minWidth: 400 };
    marker.bindPopup(popupContent, options).openPopup();

    // The popup is generated; let Leaflet take over displaying/hiding
    marker.off('click', this.generatePopup, this);
  },

  generatePopupContent: function (feature) {
    const station = `
      <shakemap-station station='${JSON.stringify(feature)}'>
      </shakemap-station>
    `;

    return station;
  }

});


export { ShakemapStationsOverlay };
