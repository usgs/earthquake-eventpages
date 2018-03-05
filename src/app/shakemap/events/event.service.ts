import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs/replaysubject';
import { MapService } from '../map/map.service';
import { InfoService } from '../bottom-panel/info/info.service';
import { StationService } from '../bottom-panel/station-list/station.service';

@Injectable()
export class EventService {
  public selectedEvent = new ReplaySubject(1);
  public events = new ReplaySubject(1)
  public manualEntry: any = null;

  constructor(private http: HttpClient,
              private mapService: MapService,
              private infoService: InfoService,
              private stationService: StationService) { }

  getEventFeed() {
    this.http.get('products.json').subscribe(
      data => {
        this.events.next(data);
      },
      error => {
        
      }
    );
  }

  parseFromEventJson(event) {

  }

  selectEvent(event) {
    this.mapService.plotEvent.next(event);
    this.infoService.getInfo(event);
    this.stationService.getInfo(event);
  }

}
