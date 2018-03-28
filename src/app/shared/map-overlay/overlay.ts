
import * as L from 'leaflet';

/**
 * Interface for overlays used with the shared-map component
 */
export interface Overlay {

  // reference to overlay
  id: string;

  // optional, bounds of data being displayed in layer (omit for worldwide view)
  bounds: Array<any>;

  // whether layer should be shown
  enabled: boolean;

  // layer object
  layer: L.Layer;

  // legend content for layer object
  legend: string;

  // title of layer, for layer control
  title: string;

}
