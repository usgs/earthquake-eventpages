import { AfterViewInit, Component, Input, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import * as L from 'leaflet';
import { Event } from '../../event';


@Component({
  selector: 'executive-region-info-pin',
  templateUrl: './region-info-pin.component.html',
  styleUrls: ['./region-info-pin.component.css']
})
export class RegionInfoPinComponent implements AfterViewInit, OnDestroy {

  public map: L.Map;
  public marker: L.Marker;

  public title = 'Region Info';
  public product: any = null;
  public link = '../region-info';

  // map element reference
  @ViewChild('regionInfoMap') regionInfoMap: ElementRef;

  private _event: Event;

  @Input() set event (event: Event) {
    this._event = event;
    this.updateLocation();
  }

  get event () {
    return this._event;
  }

  constructor() { }


  ngAfterViewInit() {
    // Create the map with nat geo
    this.map = L.map(this.regionInfoMap.nativeElement, {
      attributionControl: false,
      boxZoom: false,
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

    // create and add marker to map
    this.marker = L.marker(
      [ 0, 0 ],
      {
        icon: L.icon({
          iconUrl: 'assets/star.png',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        }),
        interactive: false
      }
    ).addTo(this.map);

    this.updateLocation();
  }

  ngOnDestroy () {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
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
  setMarkerLocation (latitude: number, longitude: number) {
    this.marker.setLatLng(L.latLng(latitude, longitude));
  }

  /**
   * Update marker location and fit bounds.
   */
  updateLocation () {
    let latitude,
        longitude;

    if (!this.map) {
      // ngAfterViewInit not called yet
      return;
    }

    if (!this.event || !this.event.geometry) {
      this.map.removeLayer(this.marker);
      return;
    }

    // Update the marker position
    latitude = this.event.geometry.coordinates[1];
    longitude = this.event.geometry.coordinates[0];
    this.setMarkerLocation(latitude, longitude);
    this.map.addLayer(this.marker);

    // Update the map bounds
    this.fitMapBounds(latitude, longitude);
    // Invalidate map size
    this.map.invalidateSize();
  }

}

