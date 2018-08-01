import {
  Component, OnDestroy, OnInit, Output, Input
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { BehaviorSubject, Subscription } from 'rxjs';

import {
  Coordinates,
  CoordinatesService,
  LocationDialogComponent
} from 'hazdev-ng-location-view';


/**
 * Location component used to select the user's location on the form
 */
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


  constructor (
    public coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) { }


  /**
   * Subscribe to the coordinate service coordinate$ object and set user
   * location
   */
  ngOnInit () {
    this.subscription.add(
      this.coordinatesService.coordinates$.subscribe((coordinates) => {
        this.setLocation(coordinates);
      })
    );
  }

  /**
   * Unsubscribe from the coordinates subscription
   */
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  /**
   * Open the location dialog/modal when user clicks
   */
  openLocationInput () {
    if (this.dialog && LocationDialogComponent) {
      this.dialog.open(LocationDialogComponent);
    }
  }

  /**
   * Set the location
   * @param {Coordinates} coordinates
   */
  setLocation (coordinates: Coordinates) {
    if (coordinates) {
      this.value = {};

      // Coordinate object will always have these attributes, check for null
      if (coordinates.name !== null) {
        this.value.ciim_mapAddress = coordinates.name;
      }
      if (coordinates.confidence !== null) {
        this.value.ciim_mapConfidence = coordinates.confidence;
      }
      if (coordinates.latitude !== null) {
        this.value.ciim_mapLat = coordinates.latitude;
      }
      if (coordinates.longitude !== null) {
        this.value.ciim_mapLon = coordinates.longitude;
      }

      this.change.next(this.value);
    }
  }

}
