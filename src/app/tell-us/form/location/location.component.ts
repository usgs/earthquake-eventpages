import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import GeoService from '@shared/geo.service';

import { AbstractForm } from '../abstract-form.component';

@Component({
  selector: 'tell-us-form-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html'
})
export class LocationComponent extends AbstractForm {
  geolocating = false;

  constructor(public geoService: GeoService, public snackBar: MatSnackBar) {
    super();
  }

  /**
   * A generic method that displays a snackbar with the provided information
   *
   * @param message string
   *      the message to be displayed on snackbar
   * @param action string
   *      text to display as the action of the snackbar
   * @param length number
   *      amount of time to display the snackbar
   *
   */
  openSnackBar(message: string, action: string, length: number) {
    this.snackBar.open(message, action, {
      duration: length
    });
  }
}
