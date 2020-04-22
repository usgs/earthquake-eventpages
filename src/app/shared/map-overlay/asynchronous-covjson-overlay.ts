import * as CovJSON from 'covjson-reader';
import * as L from 'leaflet';
import * as C from 'leaflet-coverage';


/**
 * Class for asynchronous coverage overlays used with the shared-map component.
 */
// tslint:disable-next-line:variable-name
const AsynchronousCovJSONOverlay = L.LayerGroup.extend({
  bounds: null,
  coverageParam: null,
  // retain layer data to detect whether it's already loaded
  data: null,
  enabled: true,
  // retain url grab errors
  error: Error,
  id: 'async-covjson',
  layer: null,
  legends: [],
  // retain  for custom layer adjustments
  map: null,
  popup: null,
  title: 'Async CovJSON',
  // url to download geoJSON
  url: null,

  /**
   * Init function
   */
  initialize: function () {
    L.LayerGroup.prototype.initialize.call(this, []);
  },

  /**
   * Adds a coverage layer to the LayerGroup
   *
   * @param coverage
   *    Loaded coverage object from covjson-reader library
   */
  addCoverage: function (coverage) {
    const selectedParam = coverage.parameters.get(this.coverageParam);

    const layer = C.dataLayer(coverage, {
      opacity: .4,
      palette: C.paletteFromObject(selectedParam.preferredPalette),
      paletteExtent: selectedParam.preferredPalette.extent,
      parameter: this.coverageParam
    });

    this.addLayer(layer);
    this.setZIndex(10);

    this.layer = layer;
    this.popup = new C.DraggableValuePopup({
      layers: [layer]
    });
  },

  /**
   * Handling all errors
   *
   * @param {Error}
   *
   * @return {Observable}
   *    For caught errors during http requests
   */
  handleError: function (error: any) {
    this.error = error;
    this.data = null;
  },

  /**
   * Fetch data, and ensure it is parsed into geojson
   */
  loadData: function () {
    if (this.layer !== null) {
      return;
    }

    CovJSON.read(this.url).then(coverage => {
      this.addCoverage(coverage);
    }).catch(error => {
      this.handleError(error);
    });

  },

  /**
   * Get CovJSON data and add it to the existing layer
   */
  onAdd: function (map) {
    if (map) {
      this.map = map;
      L.LayerGroup.prototype.onAdd.call(this, map);

      this.loadData();

      this.map.on('click', this.onClick, this);
    }
  },

  /**
   * Takes click event and adds a DraggablleValuePopup from the coverage
   * library to the map
   * @param e
   *    Click event
   */
  onClick: function (e) {
    if (!this.layer) {
      return null;
    }

    this.popup
        .setLatLng(e.latlng)
        .openOn(this.map);
  },

  /**
   * Remove Coverage layer, event listener, and popup from map
   */
  onRemove: function () {
    L.LayerGroup.prototype.onRemove.call(this, this.map);

    this.map.off('click', this.onClick, this);

    if (this.popup) {
      this.popup.remove();
    }
  },
});


export { AsynchronousCovJSONOverlay };
