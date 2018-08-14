import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '@core/event.service';
import { StationService } from '@core/station.service';

/**
 * Station list component, shows the available stations when selecting the
 * 'station list' tab inside the main shakemap component
 */
@Component({
  selector: 'shakemap-station-list',
  styleUrls: ['./station-list.component.scss'],
  templateUrl: './station-list.component.html'
})
export class StationListComponent implements OnInit, OnDestroy {
  stations: any[] = [];
  subs = new Subscription();

  constructor(
    public eventService: EventService,
    public stationService: StationService
  ) {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(
      this.stationService.stationsJson$.subscribe(stationsJson => {
        this.onStations(stationsJson);
      })
    );
    this.subs.add(
      this.eventService.product$.subscribe(product => {
        this.onProduct(product);
      })
    );
  }

  /**
   * New product, get new station list
   *
   * @param product
   *     shakemap product
   */
  onProduct(product: any): void {
    this.stationService.getStations(product);
  }

  /**
   * New stations
   *
   * @param stations
   *     station list json
   */
  onStations(stationsJson: any): void {
    if (stationsJson === null) {
      this.stations = [];
      return;
    }
    this.stations = stationsJson.features;
  }
}
