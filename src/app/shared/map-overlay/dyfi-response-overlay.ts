import { FormatterService } from '@core/formatter.service';
import { AsynchronousGeoJSONOverlay } from '@shared/map-overlay/asynchronous-geojson-overlay';
import { RomanPipe } from '@shared/roman.pipe';

/**
 * DYFI responses overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const DyfiResponseOverlay = AsynchronousGeoJSONOverlay.extend({
  id: '',
  legend: null,
  romanPipe: new RomanPipe(),
  title: '',
  unit: null,
  url: '',

  /**
   * Build leaflet overlay
   *
   * @param product
   *     dyfi responses product
   */
  initialize: function(product: any, unit: number): void {
    if (unit === 10) {
      this.id = 'dyfi-responses-10km';
      this.title = 'DYFI Responses 10 km';
      this.unit = 10;
    } else {
      this.id = 'dyfi-responses-1km';
      this.title = 'DYFI Responses 1 km';
      this.unit = 1;
    }
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    const legend = document.createElement('img');
    legend.setAttribute('alt', 'DYFI Response ' + this.unit + 'km');
    this.legend = legend;

    this.url = this.getUrl(product);
  },

  /**
   * Gets the url associated with this product
   *
   * @param product
   *      The event product
   * @returns url
   *      The url for the geojson files from this event product
   */
  getUrl: function(product: any): string {
    if (product === null) {
      return null;
    }
    let url;
    if (this.unit === 1) {
      url = 'dyfi_geo_1km.geojson';
    } else if (this.unit === 10) {
      url = 'dyfi_geo_10km.geojson';
    } else {
      return null;
    }
    return product.contents[url].url;
  },

  /**
   * Overriden function from the parent class, iterates through
   * each feature in the GeoJson class, sets a style for the box shown
   * on the map based on it's mmi, and then binds the popup component to it
   *
   * @param feature
   *      The GeoJson feature which is each object in the geojson file
   * @param layer
   *      The leaflet layer
   */
  onEachFeature: function(feature: any, layer: any): void {
    let formatter = new FormatterService();
    if (feature.properties) {
      layer.setStyle({
        color: '#666',
        fillColor: formatter.mmiColor(feature.properties.cdi),
        fillOpacity: 0.9,
        weight: 0.5
      });
      layer.bindPopup(this.formatPopup(feature));
    }
    formatter = null;
  },

  /**
   * Function to format the actual popup/shared mmi component for each dyfi
   * response object.
   *
   * @param feature
   *      The feature/type of marker
   * @return dyfiResponse
   *      An instance of the Dyfi Response component used in the popup
   */
  formatPopup: function(feature: any): string {
    return this.generatePopupContent(feature);
  },

  /**
   * Creates the actual popup content which is an entry component in the
   * shared moduel, dyfi-response
   *
   * @param feature
   *      The feature from the geojson objects
   *
   * @returns dyfiResponse
   *      The dyfi response component
   */
  generatePopupContent: function(feature: any) {
    let formatter = new FormatterService();
    let mmi, p, dist, name, nresp;
    p = feature.properties;
    dist = formatter.distance(p.dist, 'km');
    name = p.name;
    mmi = this.romanPipe.transform(p.cdi);
    nresp = p.nresp;
    const dyfiResponse = `
      <dyfi-response
        dist="${dist}"
        intensity="${p.cdi}"
        mmi="${mmi}"
        name="${name}"
        nresp="${nresp}"
      ></dyfi-response>
    `;
    formatter = null;
    return dyfiResponse;
  }
});

export { DyfiResponseOverlay };
