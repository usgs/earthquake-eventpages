import { Component, OnDestroy, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { BehaviorSubject, Subscription } from 'rxjs';

import {
  Coordinates,
  CoordinatesService,
  LocationDialogComponent
} from 'hazdev-ng-location-view';

@Component({
  selector: 'tell-us-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnDestroy, OnInit {

  @Output()
  change = new BehaviorSubject<any>(null);

  // label for user to enter location
  @Input()
  enter = 'Choose location';

  // label for user to change previously entered location
  @Input()
  update = 'Change location';

  // current location value
  @Input()
  value: any = {
    ciim_mapLat: null,
    ciim_mapLon: null
  };

  subscription = new Subscription();


  constructor(
    public coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) { }

  ngOnInit () {
    this.subscription.add(
      this.coordinatesService.coordinates$.subscribe((coordinates) => {
        this.setLocation(coordinates);
      })
    );
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  openLocationInput () {
    if (this.dialog && LocationDialogComponent) {
      this.dialog.open(LocationDialogComponent);
    }
  }

  setLocation (coordinates: Coordinates) {
    if (coordinates) {

      if (coordinates.name) {
        this.value.ciim_mapAddress = coordinates.name;
      }
      if (coordinates.confidence) {
        this.value.ciim_mapConfidence = coordinates.confidence;
      }
      if (coordinates.latitude) {
        this.value.ciim_mapLat = coordinates.latitude;
      }
      if (coordinates.longitude) {
        this.value.ciim_mapLon = coordinates.longitude;
      }

      this.change.next(this.value);
    }
  }

}
