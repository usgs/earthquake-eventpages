import { Component, OnDestroy, OnInit } from '@angular/core';

import { CoordinatesService } from 'earthquake-geoserve-ui';
import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';


/**
 * Displays regional information related to the event epicenter and displays
 * a static map. The static map displays the event epicenter and historic
 * seismicity overlays while linking to the interactive map with the same
 * overlays enabled.
 */
@Component({
  selector: 'app-region-info',
  templateUrl: './region-info.component.html',
  styleUrls: ['./region-info.component.scss']
})
export class RegionInfoComponent implements OnDestroy, OnInit {
  subscription: Subscription;


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

  /**
   * Updates the coordinate service with the event epicenter. The coordinate
   * service then triggers a fetch of the geoserve regional information, for:
   * administrative regions, nearby places, and tectonic summary.
   *
   * @param event {any}
   *    An event object used to define the epicenter
   */
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
