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

    const options = { minWidth: 300 };
    marker.bindPopup(popupContent, options).openPopup();

    // The popup is generated; let Leaflet take over displaying/hiding
    marker.off('click', this.generatePopup, this);
  },

  generatePopupContent: function (feature) {
    const props = feature.properties;
    const intensity = this.romanPipe.transform(props.intensity);

    const header = `
      <h3>
        ${props.code}
        <small>${props.name}</small>
      </h3>
    `;

    const summary = `
      <div class="summary">
        <div class="station-overlay-bubble intensity mmi${intensity}">
          <span>${intensity}</span>
          <abbr title="Modified Mercalli Intensity">mmi</abbr>
        </div>

        <div class="station-overlay-bubble">
          <span>${this.numberPipe.transform(props.pga, 2, '%g')}</span>
          <abbr title="Peak Ground Acceleration">pga</abbr>
        </div>

        <div class="station-overlay-bubble">
          <span>${this.numberPipe.transform(props.pgv, 2, 'cm/s')}</span>
          <abbr title="Peak Ground Velocity">pgv</abbr>
        </div>

        <div class="station-overlay-bubble">
          <span>${this.numberPipe.transform(props.distance, 2, 'km')}</span>
          <abbr title="Distance">dist</abbr>
        </div>
      </div>
    `;

    const descriptionTable = `
      <dl class="description-table station-overlay">
        <dt>Network</dt>
        <dd>${props.network}</dd>
        <dt>Location</dt>
        <dd>${this.locationPipe.transform(feature.geometry.coordinates)}</dd>
        <dt>Source</dt>
        <dd>${props.source}</dd>
        <dt>Intensity</dt>
        <dd>${this.numberPipe.transform(props.intensity, 2)}</dd>
      </dl>
    `;

    let channels = '';
    if (feature.channels.length > 0) {

      // generate table rows for each channel
      let channelRows = '';
      for (const channel of feature.channels) {
        channelRows += `
          <tr class="mat-row" role="row">
            <td class="mat-header-cell" role="rowheader">
              ${this.numberPipe.transform(channel.name)}
            </td>
            <td class="mat-cell" role="gridcell">
              ${this.numberPipe.transform(channel.pga.value, 2)}
            </td>
            <td class="mat-cell" role="gridcell">
              ${this.numberPipe.transform(channel.pgv.value, 2)}
            </td>
            <td class="mat-cell" role="gridcell">
              ${this.numberPipe.transform(channel.psa03.value, 2)}
            </td>
            <td class="mat-cell" role="gridcell">
              ${this.numberPipe.transform(channel.psa10.value, 2)}
            </td>
            <td class="mat-cell" role="gridcell">
              ${this.numberPipe.transform(channel.psa30.value, 2)}
            </td>
          </tr>
        `;
      }

      // add the rows to a table
      channels = `
        <table class="mat-table station-overlay">
          <tr class="mat-header-row mat-row">
            <th class="mat-header-cell" role="columnheader">Name</th>
            <th class="mat-header-cell" role="columnheader">PGA</th>
            <th class="mat-header-cell" role="columnheader">PGV</th>
            <th class="mat-header-cell" role="columnheader">PSA(03)</th>
            <th class="mat-header-cell" role="columnheader">PSA(10)</th>
            <th class="mat-header-cell" role="columnheader">PSA(30)</th>
          </tr>
          ${channelRows}
        </table>
      `;
    }

    return header + summary + descriptionTable + channels;
  }

});


export { ShakemapStationsOverlay };
