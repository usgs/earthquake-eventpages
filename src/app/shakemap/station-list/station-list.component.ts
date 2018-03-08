import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';
import { StationService } from '../../station.service';

@Component({
  selector: 'shakemap-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.css']
})
export class StationListComponent implements OnInit, OnDestroy {
  private subs = new Subscription()
  public stations: any[] = [];
  constructor(private eventService: EventService,
              private stationService: StationService) { }

  ngOnInit() {
    this.subs.add(this.stationService.stations.subscribe((stations) => {
      this.onStations(stations);
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
  onStations(stations) {
    if (stations == null) {
      this.stations = [];
      return
    }

    this.stations = stations;
  }

  /**
   * Unsubscribe from all existing subs when
   * the component is destroyed
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
