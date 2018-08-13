import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { EventService } from '../../core/event.service';
import { StationService } from '../../core/station.service';

/**
 * Station list component, shows the available stations when selecting the
 * 'station list' tab inside the main shakemap component
 */
@Component({
  selector: 'shakemap-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit, OnDestroy {
  public subs = new Subscription();
  public stations: any[] = [];

  constructor(
    public eventService: EventService,
    public stationService: StationService
  ) {}

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

  ngOnDestroy() {
    this.subs.unsubscribe();
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
    if (stationsJson == null) {
      this.stations = [];
      return;
    }
    this.stations = stationsJson.features;
  }
}
