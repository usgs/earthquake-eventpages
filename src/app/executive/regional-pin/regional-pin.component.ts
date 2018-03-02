import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as L from 'leaflet';

import { Event } from '../../event';


@Component({
  selector: 'region-info-pin',
  templateUrl: './regional-pin.component.html',
  styleUrls: ['./regional-pin.component.css']
})
export class RegionalPinComponent implements OnChanges {
  @Input() event: any;

  map: L.Map;
  marker: L.Marker;

  title = 'Regional Info';
  product: any;
  link = '../regional-info';
  type = 'geoserve';


  constructor() { }

  ngOnChanges (changes) {
    if (!this.event || !this.event.geometry) {
      return;
    }

    // set lat/lng
    const latitude = this.event.geometry.coordinates[1];
    const longitude = this.event.geometry.coordinates[0];

    // get geoserve product
    this.product = this.event.getProduct('geoserve');

    // Update the marker position
    this.updateMarkerLocation(latitude, longitude);

    // Update the map bounds
    this.fitMapBounds(latitude, longitude);

    // Invalidate map size
    this.map.invalidateSize();
  }

  /**
   * Create a leaflet map and add the historic seismicity overlay
   */
  createMap () {
    if (this.map) {
      return;
    }

    // Create the map with nat geo
    this.map = L.map('region-info-map', {
      attributionControl: false,
      boxZoom: false,
      center: [0, 0],
      zoom: 0,
      doubleClickZoom: false,
      dragging: false,
      fadeAnimation: false,
      keyboard: false,
      markerZoomAnimation: false,
      layers: [
        // National Geographic Base Layer
        L.tileLayer('https://services.arcgisonline.com/arcgis/rest/services/' +
          'NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 16
        }),
        // Historic Seismicity Overlay
        L.tileLayer('https://earthquake.usgs.gov/arcgis/rest' +
        '/services/eq/catalog_2015/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 16
        })
      ],
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
      zoomAnimation: false,
      zoomControl: false
    });
  }

  /**
   * Create the event location marker and add it to the map.
   */
  createMarker () {
    if (this.marker) {
      return;
    }

    if (!this.map) {
      this.createMap();
    }

    // create and add marker to map
    this.marker = L.marker(
      [ 0, 0 ],
      {
        icon: L.icon({
          iconUrl: 'assets/star.png',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        })
      }
    ).addTo(this.map);
  }

  /**
   * Set the map bounds to a 4 degree grid centered on the event location
   *
   * @param {number} latitude
   *        event latitude
   * @param {number} longitude
   *        event longitude
   */
  fitMapBounds (latitude: number, longitude: number) {
    if (!this.map) {
      this.createMap();
    }

    this.map.fitBounds([
      [latitude - 2.0, longitude - 2.0],
      [latitude + 2.0, longitude + 2.0]
    ]);
  }

  /**
   * Set the marker location on the map
   *
   * @param {number} latitude
   *        event latitude
   * @param {number} longitude
   *        event longitude
   */
  updateMarkerLocation (latitude: number, longitude: number) {
    // ensure marker is defined,
    // problem with ngOnit not being called when returning to the page
    if (!this.marker) {
      this.createMarker();
    }

    this.marker.setLatLng(L.latLng(latitude, longitude));
  }
}

