import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../core/event.service';
import { StationService } from '../../core/station.service';

@Component({
  selector: 'shakemap-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  public stations: any[] = [];
  constructor(private eventService: EventService,
              private stationService: StationService) { }

  ngOnInit() {
    this.subs.add(this.stationService.stationsJson$.subscribe((stationsJson) => {
      this.onStations(stationsJson);
    }));
    this.subs.add(this.eventService.product$.subscribe((product) => {
      this.onProduct(product);
    }));
  }

  /**
   * New product, get new station list
   *
   * @param product shakemap product
   */
  onProduct(product) {
    this.stationService.getStations(product);
  }

  /**
   * New stations
   *
   * @param stations station list json
   */
  onStations(stationsJson) {
    if (stationsJson == null) {
      this.stations = [];
      return;
    }

    this.stations = stationsJson.features;
  }

  /**
   * Unsubscribe from all existing subs when
   * the component is destroyed
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
