import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as L from 'leaflet';

import { LegendControl } from '../map-control/legend-control';
import { LatLongControl } from '../map-control/lat-long-control';

/**
 * Shared map component for event, shows overall area and mmi contours
 *
 * @param baselayer
 *     Map base layer
 * @param showAttributionControl
 *     Boolean for toggling attribution
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'shared-map',
  styleUrls: ['./map.component.scss'],
  templateUrl: './map.component.html'
})
export class MapComponent implements AfterViewInit {
  // value of bounds property
  _bounds: Array<Array<number>> = null;
  _interactive = false;
  // value of overlays property
  _overlays: Array<L.Layer> = [];
  _showLatLongControl = true;
  _showLayersControl = false;
  _showLegendControl = false;
  _showScaleControl = false;

  @Input()
  baselayer = 'Topographic';
  latLongControl: L.Control;
  layersControl: L.Control.Layers;
  legendControl: L.Control;
  map: L.Map;
  @ViewChild('mapWrapper')
  mapWrapper: ElementRef;
  // overlays currently part of the layers control
  overlaysAdded: Array<L.Layer> = [];
  scaleControl: L.Control.Scale;
  @Input()
  scrollWheelZoom: Boolean = false;
  @Input()
  showAttributionControl: Boolean = true;
  zoomControl: L.Control.Zoom;

  constructor(private httpClient: HttpClient) {}

  /**
   * Get the overlay bounds
   *
   * @return {any}
   */
  getOverlayBounds() {
    let bounds = null;

    // set bounds based on data
    this.overlays.forEach(overlay => {
      if (overlay.bounds !== null) {
        if (bounds === null) {
          bounds = L.latLngBounds(overlay.bounds);
        } else {
          bounds = bounds.extend(overlay.bounds);
        }
      }
    });

    return bounds;
  }

  ngAfterViewInit() {
    const worldTopoLayer = L.tileLayer(
      'https://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Esri, HERE, Garmin, Intermap, increment P Corp., ' +
          'GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, ' +
          'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), ' +
          'swisstopo, © OpenStreetMap contributors, and the GIS User ' +
          'Community',
        maxZoom: 16
      }
    );

    const worldImageryLayer = L.tileLayer(
      'https://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, ' +
          'CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS ' +
          'User Community',
        maxZoom: 16
      }
    );

    const worldStreetLayer = L.tileLayer(
      'https://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, ' +
          'NRCan, Esri Japan, METI, Esri China (Hong Kong), Esri Korea, ' +
          'Esri (Thailand), NGCC, © OpenStreetMap contributors, and the ' +
          'GIS User Community',
        maxZoom: 16
      }
    );

    const grayscaleLayer = L.tileLayer(
      'https://services.arcgisonline.com/' +
        'arcgis/rest/services/Canvas/World_Light_Gray_Base/' +
        'MapServer/tile/{z}/{y}/{x}',
      {
        attribution:
          'Esri, HERE, Garmin, © OpenStreetMap contributors, ' +
          'and the GIS user community',
        maxZoom: 16
      }
    );

    const baselayers = {
      Aerial: worldImageryLayer,
      Grayscale: grayscaleLayer,
      Street: worldStreetLayer,
      Topographic: worldTopoLayer
    };

    this.map = L.map(this.mapWrapper.nativeElement, {
      attributionControl: this.showAttributionControl,
      // noninteractive map setting defaults
      // managed by updateControls & updateInteractive
      boxZoom: true,
      doubleClickZoom: true,
      dragging: true,
      keyboard: true,
      layers: [baselayers[this.baselayer]],
      scrollWheelZoom: this.scrollWheelZoom,
      tap: true,
      touchZoom: true,
      zoomControl: false,
      zoomSnap: 0
    });

    this.latLongControl = new LatLongControl({ position: 'bottomright' });
    this.layersControl = L.control.layers(baselayers, {});
    this.legendControl = new LegendControl({ position: 'topright' });
    this.scaleControl = L.control.scale({ position: 'bottomright' });
    this.zoomControl = L.control.zoom();

    this.updateControls();
    this.updateInteractive();
    this.updateOverlays();

    if (this.map) {
      // Restrict latitudinal scrolling to 90 degrees both directions, but
      // allow user to pan longitudinally for 2 full globes, this helps to
      // not push the centerpoint off until they have zoomed out 1 full globe
      const northEastGlobal = L.latLng(-90.0, -180.0 * 2);
      const southWestGlobal = L.latLng(90.0, 180.0 * 2);
      const globalBounds = L.latLngBounds(northEastGlobal, southWestGlobal);
      this.map.setMaxBounds(globalBounds);
    }
  }

  /**
   * Set map bounds
   *
   * @param bounds
   *     Array of bounds for map
   */
  @Input()
  set bounds(bounds: Array<Array<number>>) {
    this._bounds = bounds;
    this.setBounds();
  }

  /**
   * Get map bounds
   *
   * @return {Array<number>}
   */
  get bounds(): Array<Array<number>> {
    return this._bounds;
  }

  /**
   * Set whether or not to show an interactive map
   *
   * @param interactive
   *     Is map interactive?
   */
  @Input()
  set interactive(interactive: boolean) {
    this._interactive = interactive;

    this.updateControls();
    this.updateInteractive();
  }

  /**
   * Get the _interactive value
   *
   * @return {boolean}
   */
  get interactive(): boolean {
    return this._interactive;
  }

  /**
   * Set map overlays
   *
   * @param overlays
   *     Array of different map overlays
   */
  @Input()
  set overlays(overlays: Array<L.Layer>) {
    this._overlays = overlays;

    this.updateOverlays();
    this.updateLegend();
  }

  /**
   * Get map overlays
   *
   * @return {Array<L.layer>}
   */
  get overlays(): Array<L.Layer> {
    return this._overlays;
  }

  /**
   * Set whether or not to show lat/long control
   *
   * @param showLatLongControl
   *      Show lat/long control?
   */
  @Input()
  set showLatLongControl(showLatLongControl: boolean) {
    this._showLatLongControl = showLatLongControl;

    this.updateControls();
  }

  /**
   * Get the _showLatLongControl value
   *
   * @return boolean
   */
  get showLatLongControl(): boolean {
    return this._showLatLongControl;
  }

  /**
   * Set whether or not to show layers control
   *
   * @param showLayersControl
   *     Show layers control?
   */
  @Input()
  set showLayersControl(showLayersControl: boolean) {
    this._showLayersControl = showLayersControl;

    this.updateControls();
  }

  /**
   * Get the _showLayersControl value
   *
   * @return {boolean}
   */
  get showLayersControl(): boolean {
    return this._showLayersControl;
  }

  /**
   * Set whether or not to show legend control
   *
   * @param showLegendControl
   *     Show the legend control?
   */
  @Input()
  set showLegendControl(showLegendControl: boolean) {
    this._showLegendControl = showLegendControl;

    this.updateControls();
  }

  /**
   * Get the showLegendControl value
   *
   * @return {boolean}
   */
  get showLegendControl(): boolean {
    return this._showLegendControl;
  }

  /**
   * Set whether or not to show scale control
   *
   * @param showScaleControl
   *     The boolean value, show scale controls?
   */
  @Input()
  set showScaleControl(showScaleControl: boolean) {
    this._showScaleControl = showScaleControl;

    this.updateControls();
  }

  /**
   * Get the showScaleControl
   *
   * @return {boolean}
   */
  get showScaleControl(): boolean {
    return this._showScaleControl;
  }

  /**
   * Set map to match overlay bounds
   */
  setBounds() {
    if (!this.map) {
      return;
    }

    let bounds = this.bounds;

    // use overlays if no explicit bounds set
    if (bounds === null) {
      bounds = this.getOverlayBounds();
    }

    // default to world if no overlay bounds
    if (bounds === null) {
      bounds = [[85.0, 180.0], [-85.0, 180.0]];
    }

    setTimeout(() => {
      if (this.map) {
        this.map.fitBounds(bounds);
        this.map.invalidateSize();
      }
    }, 0);
  }

  /**
   * Update/add map controls
   */
  updateControls() {
    if (!this.map) {
      return;
    }

    if (this.showLatLongControl && this.interactive === true) {
      this.map.addControl(this.latLongControl);
    } else {
      this.map.removeControl(this.latLongControl);
    }

    if (this.showLayersControl && this.interactive === true) {
      this.map.addControl(this.layersControl);
    } else {
      this.map.removeControl(this.layersControl);
    }

    if (this.showLegendControl && this.interactive === true) {
      this.map.addControl(this.legendControl);
    } else {
      this.map.removeControl(this.legendControl);
    }

    if (this.showScaleControl) {
      this.map.addControl(this.scaleControl);
    } else {
      this.map.removeControl(this.scaleControl);
    }

    if (this.interactive) {
      this.map.addControl(this.zoomControl);
    } else {
      this.map.removeControl(this.zoomControl);
    }
  }

  /**
   * Make the map interactive
   */
  updateInteractive() {
    if (!this.map) {
      return;
    }

    const handlers = [
      this.map.boxZoom,
      this.map.doubleClickZoom,
      this.map.dragging,
      this.map.keyboard,
      this.map.tap,
      this.map.touchZoom
    ];
    const interactive = this.interactive;

    handlers.forEach(handler => {
      if (!handler) {
        return;
      }

      if (interactive) {
        handler.enable();
      } else {
        handler.disable();
      }
    });
  }

  /**
   * Update legend control
   */
  updateLegend() {
    if (!this.legendControl) {
      return;
    }

    this.legendControl.displayLegends();
  }

  /**
   * Update map overlays
   */
  updateOverlays() {
    // // check if layer control has been created
    if (!this.map || !this.layersControl) {
      return;
    }

    const overlays = this._overlays;

    // remove overlays from map and layer control
    this.overlaysAdded = this.overlaysAdded.filter(overlay => {
      if (!overlays.includes(overlay)) {
        this.layersControl.removeLayer(overlay);
        this.map.removeLayer(overlay);
        return false;
      } else {
        return true;
      }
    });

    // add overlays to layer control and add/remove overlay to/from map
    overlays.forEach(overlay => {
      if (overlay.hasOwnProperty('httpClient')) {
        overlay.httpClient = this.httpClient;
      }
      if (!this.overlaysAdded.includes(overlay)) {
        this.overlaysAdded.push(overlay);
        this.layersControl.addOverlay(overlay, overlay.title);
      }
      if (overlay.enabled) {
        this.map.addLayer(overlay);
      } else {
        this.map.removeLayer(overlay);
      }
    });

    this.setBounds();
  }
}
