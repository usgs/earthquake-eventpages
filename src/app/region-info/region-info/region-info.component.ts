import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { HistoricSeismicityOverlay } from '../../shared/map-overlay/historic-seismicity-overlay';
import { EventService } from '../../../..';

import { CoordinatesService } from 'earthquake-geoserve-ui';

import * as L from 'leaflet';


@Component({
  selector: 'app-region-info',
  templateUrl: './region-info.component.html',
  styleUrls: ['./region-info.component.css']
})
export class RegionInfoComponent implements OnDestroy, OnInit {

  public overlays: Array<L.Layer> = [ new HistoricSeismicityOverlay() ];

  private subscription: Subscription;

  constructor (
    public coordinatesService: CoordinatesService,
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.subscription = this.eventService.event$.subscribe((event: any) => {
      this.updateGeoserveCoordinateService(event);
    });
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  updateGeoserveCoordinateService (event: any) {
    if (!event || !event.geometry) {
      return;
    }

    const latitude = event.geometry.coordinates[0];
    const longitude = event.geometry.coordinates[1];

    this.coordinatesService.setCoordinates({
      longitude: latitude,
      latitude: longitude
    });
  }
}
