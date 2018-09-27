import { AsynchronousGeoJSONOverlay } from '@shared/map-overlay/asynchronous-geojson-overlay';

/**
 * Finite Fault overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const FiniteFaultMapOverlay = AsynchronousGeoJSONOverlay.extend({
  id: 'finite-fault-overlay',
  title: 'Finite Fault',
  url: '',

  /**
   * Build leaflet overlay
   *
   * @param product
   *      FF product
   */
  initialize: function(product: any): void {
    AsynchronousGeoJSONOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  /**
   * Function to get the geojson url
   *
   * @param product
   *      The finite fault product
   */
  getUrl: function(product: any): string {
    try {
      return product.contents['FFM.geojson'].url;
    } catch (e) {
      return null;
    }
  },

  /**
   * Function overridden from parent class, sets the style on each feature
   * from the geojson file, then binds the popup content to it
   *
   * @param feature
   *      The geojson feature object
   * @param layer
   *      The layer associated with each feature
   */
  onEachFeature: function(feature: any, layer: any): void {
    if (feature.properties && layer) {
      layer.setStyle({
        color: '#666',
        fillColor: feature.properties.fill,
        fillOpacity: feature.properties['fill-opacity'],
        weight: feature.properties['stroke-width']
      });
      layer.bindPopup(this.formatPopup(feature));
    }
  },

  /**
   * Helper function that binds popup to each feature and returns it to parent
   * caller
   *
   * @param feature
   *      geojson feature
   * @returns
   *      The popup template
   */
  formatPopup: function(feature: any): any {
    return this.generatePopupContent(feature);
  },

  /**
   * Function to bind each features properties to the actual popup component
   *
   * @param feature
   *      The geojson feature to bind the popup content to
   * @returns
   *      The popup component template
   */
  generatePopupContent: function(feature: any): any {
    let moment, slip, rise, trup, rake, color;

    if (feature.properties) {
      const props = feature.properties;
      const unknown = 'Data Unavailable';

      /* tslint:disable:no-string-literal */
      moment = props['sf_moment']
        ? props['sf_moment'].toExponential() + ' N-m'
        : unknown;
      /* tslint:enable:no-string-literal */
      slip = props.slip ? props.slip : unknown;
      rise = props.rise ? props.rise : unknown;
      trup = props.trup ? props.trup : unknown;
      rake = props.rake ? props.rake : unknown;
      color = props.fill ? props.fill : '#FFFFFF';

      const ffMapPopup = `
        <finite-fault-map-popup
          color="${color}"
          moment="${moment}"
          rake="${rake}"
          rise="${rise}"
          slip="${slip}"
          trup="${trup}"
        ></finite-fault-map-popup>
      `;
      return ffMapPopup;
    }
    return `<h2>Data Unavailable</h2>`;
  }
});

export { FiniteFaultMapOverlay };
