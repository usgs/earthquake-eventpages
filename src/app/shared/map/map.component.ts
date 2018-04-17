import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as L from 'leaflet';

import { Overlay } from '../map-overlay/overlay';
import { LegendControl } from '../map-control/legend-control';

@Component({
  selector: 'shared-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  @Input() baselayer = 'Topographic';
  @Input() showAttributionControl = true;

  // value of overlays property
  private _overlays: Array<Overlay> = [];

  private _showLayersControl = false;
  private _showLegendControl = false;
  private _showScaleControl = false;

  // overlays currently part of the layers control
  public overlaysAdded: Array<L.Layer> = [];

  public map: L.Map;
  public layersControl: L.Control.Layers;
  public legendControl: L.Control;
  public scaleControl: L.Control.Scale;
  public zoomControl: L.Control.Zoom;

  private _interactive = false;

  @ViewChild('mapWrapper')
  mapWrapper: ElementRef;

  constructor (private httpClient: HttpClient) { }

  ngOnInit () {

  }

  ngAfterViewInit () {
    const worldTopoLayer = L.tileLayer('https://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri, HERE, Garmin, Intermap, increment P Corp., ' +
              'GEBCO, USGS, FAO, NPS, NRCAN, GeoBase, IGN, Kadaster NL, ' +
              'Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), ' +
              'swisstopo, © OpenStreetMap contributors, and the GIS User ' +
              'Community',
          maxZoom: 16
        }
    );

    const worldImageryLayer = L.tileLayer('https://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, ' +
              'CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS ' +
              'User Community',
          maxZoom: 16
        }
    );

    const worldStreetLayer = L.tileLayer('https://services.arcgisonline.com/' +
        'arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri, HERE, Garmin, USGS, Intermap, INCREMENT P, ' +
              'NRCan, Esri Japan, METI, Esri China (Hong Kong), Esri Korea, ' +
              'Esri (Thailand), NGCC, © OpenStreetMap contributors, and the ' +
              'GIS User Community',
          maxZoom: 16
        }
    );

    const grayscaleLayer = L.tileLayer('https://services.arcgisonline.com/' +
        'arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Esri, HERE, Garmin, © OpenStreetMap contributors, ' +
              'and the GIS user community',
          maxZoom: 16
        }
    );

    const baselayers = {
      'Topographic': worldTopoLayer,
      'Aerial': worldImageryLayer,
      'Street': worldStreetLayer,
      'Grayscale': grayscaleLayer
    };

    this.map = L.map(this.mapWrapper.nativeElement, {
      attributionControl: this.showAttributionControl,
      layers: [
        baselayers[this.baselayer]
      ],
      scrollWheelZoom: false,
      // noninteractive map setting defaults
      // managed by updateControls & updateInteractive
      boxZoom: true,
      doubleClickZoom: true,
      dragging: true,
      keyboard: true,
      tap: true,
      touchZoom: true,
      zoomControl: false
    });

    this.layersControl = L.control.layers(baselayers, {});
    this.legendControl = new LegendControl({position: 'topright'});
    this.scaleControl = L.control.scale({position: 'bottomright'});
    this.zoomControl = L.control.zoom();

    this.updateControls();
    this.updateInteractive();
    this.updateOverlays();
  }

  @Input()
  set interactive (interactive: boolean) {
    this._interactive = interactive;

    this.updateControls();
    this.updateInteractive();
  }

  get interactive (): boolean {
    return this._interactive;
  }

  @Input()
  set overlays (overlays: Array<Overlay>) {
    this._overlays = overlays;

    this.updateOverlays();
    this.updateLegend();
  }

  get overlays (): Array<Overlay> {
    return this._overlays;
  }

  @Input()
  set showLayersControl (showLayersControl: boolean) {
    this._showLayersControl = showLayersControl;

    this.updateControls();
  }

  get showLayersControl (): boolean {
    return this._showLayersControl;
  }

  @Input()
  set showLegendControl (showLegendControl: boolean) {
    this._showLegendControl = showLegendControl;

    this.updateControls();
  }

  get showLegendControl(): boolean {
    return this._showLegendControl;
  }

  @Input()
  set showScaleControl (showScaleControl: boolean) {
    this._showScaleControl = showScaleControl;

    this.updateControls();
  }

  get showScaleControl (): boolean {
    return this._showScaleControl;
  }

  getOverlayBounds () {
    let bounds = null;

    // set bounds based on data
    this.overlays.forEach((overlay) => {
      if (overlay.bounds != null) {
        if (bounds === null) {
          bounds = L.latLngBounds(overlay.bounds);
        } else {
          bounds = bounds.extend(overlay.bounds);
        }
      }
    });

    return bounds;
  }

  setBounds () {
    if (!this.map) {
      return;
    }

    let bounds = this.getOverlayBounds();

    // default to world if no overlay bounds
    if (bounds === null) {
      bounds = [[85.0, 180.0], [-85.0, 180.0]];
    }

    this.map.fitBounds(bounds);
    this.map.invalidateSize();

  }

  updateControls () {
    if (!this.map) {
      return;
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

  updateInteractive () {
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

    handlers.forEach((handler) => {
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

  updateLegend () {
    if (!this.legendControl) {
      return;
    }

    this.legendControl.setOverlays(this._overlays);
  }

  updateOverlays () {

    // // check if layer control has been created
    if (!this.map || !this.layersControl) {
      return;
    }

    const overlays = this._overlays;

    // remove overlays from map and layer control
    this.overlaysAdded = this.overlaysAdded.filter((overlay) => {
      if (!overlays.includes(overlay)) {
        this.layersControl.removeLayer(overlay.layer);
        this.map.removeLayer(overlay.layer);
        return false;
      } else {
        return true;
      }
    });

    // add overlays to layer control and add/remove overlay to/from map
    overlays.forEach((overlay) => {
      if (overlay.hasOwnProperty('httpClient')) {
        overlay.httpClient = this.httpClient;
      }
      if (!this.overlaysAdded.includes(overlay)) {
        this.overlaysAdded.push(overlay);
        this.layersControl.addOverlay(overlay.layer, overlay.title);
      }
      if (overlay.enabled) {
        this.map.addLayer(overlay.layer);
      } else {
        this.map.removeLayer(overlay.layer);
      }
    });

    this.setBounds();
  }

}
