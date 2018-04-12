import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import * as L from 'leaflet';

import { Overlay } from './overlay';


/**
 * Class for asynchronous overlays used with the shared-map component
 */
class AsynchronousGeoJSONOverlay implements Overlay {

  // reference to overlay
  id: string;

  // optional, bounds of data being displayed in layer (omit for worldwide view)
  bounds: Array<any>;

  // whether layer should be shown
  enabled: boolean;

  // GeoJSON object object
  layer: L.GeoJSON;

  // legend content for layer object
  legend: string;

  // title of layer, for layer control
  title: string;

  // for content downloads in async map layers; added to layer during
  // initialization, or manually
  httpClient: any = null;

  // url to download geoJSON
  url: string = null;

  // retain layer data
  data: any = null;

  // retain url grab errors
  error: Error;

  constructor () {
    const options = {
      style: (f) => this.style(f),
      onEachFeature: (f, l) => this.onEachFeature(f, l)
    };

    this.layer = L.geoJSON([], options);

    this.layer.on('add', this.onAdd, this);
  }


  /**
   * Handling all errors
   *
   * @param {Error}
   *
   * @return {Observable}
   *    For caught errors during http requests
   */
  private handleError (error) {
    this.error = error;
    this.data = null;
    return of(null);
  }


  /**
   * Handle geoJSON internally
   *
   * @param data {Any}
   *    geoJSON data ready for parsing
   */
  _handleGeoJSON (data) {
    // parse if needed
    data = (typeof data === 'string' ? JSON.parse(data) : data);

    // allow class specific parsing
    data = this.handleGeoJSON(data);

    // flag that data is loaded
    this.data = data;
    // add data to layer (and map if layer still visible)
    this.layer.addData(data);
  }


  /**
   * OPTIONAL: OVERWRITE IN EXTENDING CLASS
   *
   * Additional class specific parsing of geoJSON data
   *
   * @param data {Any}
   *    GeoJSON data
   *
   * @return {Any}
   *    Parsed geoJSON
   *
   */
  handleGeoJSON (data) {
    return data;
  }


  /**
   * Get geoJSON data and add it to the existing layer
   */
  onAdd () {
    if (!this.url || !this.httpClient) {
      this.data = null;
      return;
    }

    if (this.data === null) {
      // flag that data is being loaded
      this.data = 'loading';
      this.httpClient.get(this.url).pipe(
        catchError(error => this.handleError(error))
      ).subscribe((data) => {
          try {
            this._handleGeoJSON(data);

            // data add successful, remove event listener
            this.layer.removeEventListener('add', this.onAdd, this);
          } catch (error) {
            this.handleError(error);
          }
        }
      );
    }
  }


  /**
   * OVERWRITE IN EXTENDING CLASS
   *
   * Make alterations to feature representations (ex. adding a popup)
   *
   * @param feature {Any}
   *    GeoJSON feature
   *
   * @param layer {L.Layer}
   *    Leaflet layer
   *
   */
  onEachFeature (feature, layer) {}


  /**
   * OVERWRITE IN EXTENDING CLASS
   *
   * Sets style for geoJSON; must follow Leaflet's guidelines
   *
   * @param feature {Any}
   *    GeoJSON feature
   *
   * @return {Any}
   *    Object containing desired styles
   */
  style (feature): any {
    return {};
  }

}

export { AsynchronousGeoJSONOverlay };
