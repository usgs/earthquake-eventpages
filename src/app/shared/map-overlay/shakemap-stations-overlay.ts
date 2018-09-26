import * as L from 'leaflet';

import { FormatterService } from '@core/formatter.service';
import { StationService } from '@core/station.service';
import { LocationPipe } from '../location.pipe';
import { NumberPipe } from '../number.pipe';
import { RomanPipe } from '../roman.pipe';
import { AsynchronousGeoJSONOverlay } from './asynchronous-geojson-overlay';

/**
 * Shakemap overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const ShakemapStationsOverlay = AsynchronousGeoJSONOverlay.extend({
  id: 'shakemap-stations',
  legends: [],
  locationPipe: null,
  numberPipe: null,
  romanPipe: new RomanPipe(),
  title: 'Shakemap Stations',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     The product from the event
   */
  initialize: function(product: any) {
    const mmiLegend = document.createElement('img');
    mmiLegend.src = './assets/shakemap-intensity-legend-small.png';
    mmiLegend.setAttribute('alt', 'Intensity Scale Legend');

    const stationLegend = document.createElement('img');
    stationLegend.src = './assets/legend-seismic-station.png';
    stationLegend.setAttribute('alt', 'Seismic Station Legend');

    const dyfiStation = document.createElement('img');
    dyfiStation.src = './assets/legend-shakemap-station.png';
    dyfiStation.setAttribute('alt', 'DYFI Shakemap Station Legend');

    // Add to legends array
    this.legends.push(mmiLegend, stationLegend, dyfiStation);

    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    const formatter = new FormatterService();
    this.locationPipe = new LocationPipe(formatter);
    this.numberPipe = new NumberPipe(formatter);

    this.url = this.getUrl(product);
  },

  /**
   * Gets the url associated with this product
   *
   * @param product
   *     The product from the event
   */
  getUrl: function(product: any) {
    if (product === null) {
      return null;
    }

    return product.contents['download/stationlist.json']
      ? product.contents['download/stationlist.json'].url
      : null;
  },

  /**
   * Creates a map marker for a map station and sets click listener on it
   *
   * @param feature
   *     The feature/type of marker
   * @param latlng
   *     The coordinates for the marker
   */
  pointToLayer: function(feature: any, latlng: any) {
    const props = feature.properties;
    const intensity = this.romanPipe.transform(props.intensity);
    let marker;

    if (
      props.network === 'DYFI' ||
      props.network === 'INTENSITY' ||
      props.station_type === 'macroseismic'
    ) {
      // create a marker for a DYFI station
      marker = L.marker(latlng, {
        icon: L.divIcon({
          className: `station-overlay-dyfi-layer-icon mmi${intensity}`,
          iconAnchor: [7, 7],
          iconSize: [14, 14],
          popupAnchor: [0, 0]
        })
      });
    } else {
      // create a marker for a seismic station
      marker = L.marker(latlng, {
        icon: L.divIcon({
          className:
            'station-overlay-station-layer-icon station-mmi' + `${intensity}`,
          iconAnchor: [7, 8],
          iconSize: [14, 10],
          popupAnchor: [0, -4]
        })
      });
    }

    // Add event listener to generate a popup when the station is clicked
    marker.on('click', this.generatePopup, this);
    return marker;
  },

  /**
   * Helper function to parse stationlist json
   *
   * @param data
   *     The data to parse
   */
  parse: function(data: any) {
    // parse if needed
    data = typeof data === 'string' ? JSON.parse(data) : data;

    // use StationService to parse stationlist.json
    const stationService = new StationService(this.httpClient);
    data = stationService.translate(data);
    return data;
  },

  /**
   * Function to generate the popup for a click event
   *
   * @param event
   *     The event
   */
  generatePopup: function(event: any) {
    const marker = event.target;
    const popupContent = this.generatePopupContent(marker.feature);

    const options = {
      maxWidth: 'auto'
    };
    marker.bindPopup(popupContent, options).openPopup();

    // The popup is generated; let Leaflet take over displaying/hiding
    marker.off('click', this.generatePopup, this);
  },

  /**
   * Helper function to generate popup html content
   *
   * @param feature
   *     The feature data to parse for the popup
   */
  generatePopupContent: function(feature: any) {
    const station = `
      <shakemap-station station='${JSON.stringify(feature)}'>
      </shakemap-station>
    `;

    return station;
  }
});

export { ShakemapStationsOverlay };
