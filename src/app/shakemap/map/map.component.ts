declare function require(string): string;

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';

import * as L from 'leaflet';

import { MapService } from './map.service';
import { LayerService } from './layers/layer.service';
import { MapControlService } from './map-control/map-control.service';
import { ConfService } from '../conf.service';

@Component({
  selector: 'shakemap-view-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private subs: any[] = [];
  private map: any = null;
  private basemap: any = null;
  private layersControl: any = null;
  private defLayers: any[] = [];
  private allLayers: any[] = [];

  constructor(private mapService: MapService,
              private layerService: LayerService,
              private controlService: MapControlService,
              private c: ConfService) { }

  ngOnInit() {
    this.subs.push(this.mapService.plotEvent.subscribe(event => {
      this.clearMap();
      this.plotEvent(event);
    }));

    this.subs.push(this.layerService.nextLayer.subscribe(layer => {
      this.addLayer(layer);
    }));

    this.subs.push(this.mapService.setBounds.subscribe(bounds => { 
      this.setBounds(bounds);
    }));

    // eslint-disable-next-line  
    delete L.Icon.Default.prototype._getIconUrl
    // eslint-disable-next-line  
    L.Icon.Default.mergeOptions({  
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),  
      iconUrl: require('leaflet/dist/images/marker-icon.png'),  
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')  
    })

    this.genBasemap();

    let mapControls = {};
    if (this.c.conf['display'] === 'static') {
      mapControls = {
        boxZoom: false,
        center: [0, 0],
        zoom: 0,
        doubleClickZoom: false,
        dragging: false,
        fadeAnimation: false,
        keyboard: false,
        markerZoomAnimation: false,
        scrollWheelZoom: false,
        tap: false,
        touchZoom: false,
        zoomAnimation: false,
        zoomControl: false
      }
    } else {
      mapControls = {
        scrollWheelZoom: false
      }
    }

    this.map = L.map('map', mapControls).setView([51.505, -0.09], 13);
    this.basemap.addTo(this.map);
    this.layersControl = L.control.layers({'Basemap': this.basemap});

    this.mapService.map = this.map
  }

  plotEvent(event) {
    this.layersControl = L.control.layers({'Basemap': this.basemap});
    this.layerService.genLayers(event);
  }

  addLayer(layer) {
      this.controlService.addOverlay(layer);
  }

  setBounds(bounds) {
    this.map.fitBounds(bounds);
  }

  genBasemap() {
    this.basemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapService.mapKey, {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery � <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        });
  }

  clearMap() {
    this.controlService.clear();
  }

  ngOnDestroy() {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
