import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { GeoService, LocationError } from '@shared/geo.service';
import { AbstractForm } from '../abstract-form.component';

@Component({
  selector: 'tell-us-form-location',
  styleUrls: ['./location.component.scss'],
  templateUrl: './location.component.html'
})
export class LocationComponent extends AbstractForm
  implements OnInit, OnDestroy {
  subscription = new Subscription();

  constructor(public geoService: GeoService, public snackBar: MatSnackBar) {
    super();
  }

  /**
   * Unsubscribe from the GeoService.error$ observable
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Subscribe to GeoService.error$ and display error in a SnackBar component
   */
  ngOnInit() {
    this.subscription = this.geoService.error$.subscribe(
      (locationError: LocationError) => {
        if (locationError) {
          this.openSnackBar(locationError.message, 'close');
        }
      }
    );
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
  openSnackBar(message: string, action: string = null, length: number = 3000) {
    this.snackBar.open(message, action, {
      duration: length
    });
  }
}
