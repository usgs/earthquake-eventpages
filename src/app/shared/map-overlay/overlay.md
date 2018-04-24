# Interface for shared-map overlays.

> These have been changed to leaflet classes, and so can no longer
> implement a typescript interface as originally intended.


## L.Layer object properties used by Overlay pipes

- id: `string`
  identifier for overlay, must be unique.

  used by different overlay pipes to enable/disable overlays,
  and on the interactive map to enable/disable based on query string parameters.

- bounds: `Array<any>`
  optional, bounds of data being displayed in layer (omit for worldwide view)

  used by shared map to zoom, unless the map has explicit bounds.

- enabled: `boolean`
  whether layer should be shown

- legend: `DOMElement`
  legend content for layer object, or null if no legend.

- title: `string`
  title of layer, for layer control

- httpClient?: `any`
  for content downloads in async map layers

  if a layer `hasOwnProperty('httpClient')` (so this needs to be set in initialize),
  the shared map will provide the angular HttpClient service.
