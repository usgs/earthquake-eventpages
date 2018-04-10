import { AsynchronousGeoJson } from './async-geojson';
import { Overlay } from './overlay'
import * as L from 'leaflet';

/**
 * Interface for asynchronous overlays used with the shared-map component
 */
export interface AsyncOverlay extends Overlay {

  // url to grab data from
  _url: string

  // GeoJSON data
  _data: any

}
