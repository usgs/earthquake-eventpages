import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '@core/event.service';
import { PlacesService, RegionsService } from 'hazdev-ng-geoserve-output';
import { Subscription } from 'rxjs';
import { NearbyCitiesService } from '../nearby-cities.service';

/**
 * Displays regional information related to the event epicenter and displays
 * a static map. The static map displays the event epicenter and historic
 * seismicity overlays while linking to the interactive map with the same
 * overlays enabled.
 */
@Component({
  selector: 'app-region-info',
  styleUrls: ['./region-info.component.scss'],
  templateUrl: './region-info.component.html'
})
export class RegionInfoComponent implements OnDestroy, OnInit {
  subscription: Subscription;

  constructor(
    public placesService: PlacesService,
    public regionsService: RegionsService,
    public citiesService: NearbyCitiesService,
    public eventService: EventService
  ) {}

  /**
   * Updates the coordinate service with the event epicenter. The coordinate
   * service then triggers a fetch of the geoserve regional information, for:
   * administrative regions, nearby places, and tectonic summary.
   *
   * @param event {any}
   *    An event object used to define the epicenter
   */
  getGeoserveData(event: any) {
    if (!event || !event.geometry) {
      return;
    }
    let coordinates;

    const latitude = event.geometry.coordinates[1];
    const longitude = event.geometry.coordinates[0];

    coordinates = {
      latitude: latitude,
      longitude: longitude
    };

    this.getPlaces(coordinates);
    this.getRegions(coordinates);
  }

  /**
   * Pass the coordinates to the RegionsService
   */
  getPlaces(coordinates) {
    if (
      coordinates &&
      (coordinates.latitude || coordinates.latitude === 0) &&
      (coordinates.longitude || coordinates.longitude === 0)
    ) {
      this.placesService.getPlaces(coordinates.latitude, coordinates.longitude);
    }
  }

  /**
   * Pass the coordinates to the PlacesService
   */
  getRegions(coordinates) {
    if (
      coordinates &&
      (coordinates.latitude || coordinates.latitude === 0) &&
      (coordinates.longitude || coordinates.longitude === 0)
    ) {
      this.regionsService.getRegions(
        coordinates.latitude,
        coordinates.longitude
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.eventService.event$.subscribe((event: any) => {
      this.getGeoserveData(event);
    });
  }
}
