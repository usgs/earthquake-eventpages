import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import * as L from 'leaflet';

import { Overlay } from '../map-overlay/overlay';

@Component({
  selector: 'shared-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  @Input() baselayer = 'Topographic';
  @Input() showAttributionControl = true;
  @Input() showLayersControl = false;
  @Input() showScaleControl = false;

  private _overlays: Array<Overlay> = [];

  @Input() set overlays (overlays: Array<Overlay>) {
    this._overlays = overlays;

    this.updateOverlays();
  }

  get overlays (): Array<Overlay> {
    return this._overlays;
  }

  @ViewChild('mapWrapper')
  mapWrapper: ElementRef;

  private _overlaysAdded: Array<Overlay> = [];

  public map: L.Map;
  public layersControl: L.Control.Layers;


  constructor () { }

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
      scrollWheelZoom: false
    });

    this.layersControl = L.control.layers(baselayers, {});
    if (this.showLayersControl) {
      this.map.addControl(this.layersControl);
    }

    if (this.showScaleControl) {
      this.map.addControl(L.control.scale({position: 'bottomright'}));
    }

    this.map.fitBounds([[85.0, 180.0], [-85.0, 180.0]]);

    this.updateOverlays();
  }

  updateOverlays () {
    // check if layer control has been created
    if (!this.layersControl) {
      return;
    }

    const overlays = this._overlays;

    // remove overlays from map and layer control
    this._overlaysAdded = this._overlaysAdded.filter((overlay) => {
      if (!overlays.includes(overlay)) {
        this.layersControl.removeLayer(overlay.layer);
        this.map.removeLayer(overlay.layer);
      }
    });

    // add overlays to layer control and add/remove overlay to/from map
    overlays.forEach((overlay) => {
      if (!this._overlaysAdded.includes(overlay)) {
        this._overlaysAdded.push(overlay);
        this.layersControl.addOverlay(overlay.layer, overlay.title);
      }
      if (overlay.enabled) {
        this.map.addLayer(overlay.layer);
      } else {
        this.map.removeLayer(overlay.layer);
      }
    });
  }

}
