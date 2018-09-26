import { AsynchronousGeoJSONOverlay } from '@shared/map-overlay/asynchronous-geojson-overlay';
import { FormatterService } from '@core/formatter.service';

/**
 * Finite Fault overlay for leaflet map
 */
// tslint:disable-next-line:variable-name
const FfMapOverlay = AsynchronousGeoJSONOverlay.extend({
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
    if (product === null) {
      return null;
    }
    if (
      product.contents &&
      product.contents['FFM.geojson'] &&
      product.contents['FFM.geojson'].url
    ) {
      return product.contents['FFM.geojson'].url;
    }
    return null;
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
    let formatter = new FormatterService();
    let moment, slip, rise, trup, rake, color;

    if (feature.properties) {
      const props = feature.properties;
      const unknown = 'Data Unavailable';

      /* tslint:disable:no-string-literal */
      moment = props['sf_moment']
        ? props['sf_moment'].toExponential() + ' N-m'
        : unknown;
      /* tslint:enable:no-string-literal */
      slip = props.slip ? formatter.distance(props.slip, 'm') : unknown;
      rise = props.rise ? formatter.distance(props.rise, 'm') : unknown;
      trup = props.trup ? formatter.distance(props.trup, 'm') : unknown;
      rake = props.rake ? formatter.distance(props.rake, 'm') : unknown;
      color = props.fill ? props.fill : '#FFFFFF';

      formatter = null;

      const ffMapPopup = `
        <ff-map-popup
          color="${color}"
          moment="${moment}"
          rake="${rake}"
          rise="${rise}"
          slip="${slip}"
          trup="${trup}"
        ></ff-map-popup>
      `;
      return ffMapPopup;
    }
    formatter = null;
    return `<h2>Data Unavailable</h2>`;
  }
});

export { FfMapOverlay };
