import { Component, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  Coordinates,
  CoordinatesService,
  LocationDialogComponent
} from 'hazdev-ng-location-view';
import { BehaviorSubject, Subscription } from 'rxjs';

/**
 * Location component used to select the user's location on the form
 *
 * @param change
 *     Behaviorsubject emits when location has changes/been selected
 * @param enter
 *     Label for user to enter location
 * @param update
 *     Label for user to change location, if entered before
 * @param value
 *     Value of current location
 */
@Component({
  selector: 'tell-us-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html'
})
export class LocationComponent implements OnDestroy, OnInit {
  @Output()
  change = new BehaviorSubject<any>(null);
  // label for user to enter location
  @Input()
  enter = 'Choose location';
  // label for user to change previously entered location
  subscription = new Subscription();
  @Input()
  update = 'Change location';
  // current location value
  @Input()
  value: any = {
    ciim_mapLat: null,
    ciim_mapLon: null
  };

  constructor(
    public coordinatesService: CoordinatesService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription.add(
      this.coordinatesService.coordinates$.subscribe(coordinates => {
        this.setLocation(coordinates);
      })
    );
  }

  /**
   * Open the location dialog/modal when user clicks
   */
  openLocationInput() {
    if (this.dialog && LocationDialogComponent) {
      this.dialog.open(LocationDialogComponent);
    }
  }

  /**
   * Set the location
   *
   * @param coordinates
   *     The coordinates to set
   */
  setLocation(coordinates: Coordinates) {
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
