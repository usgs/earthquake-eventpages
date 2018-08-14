import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { EventService } from '@core/event.service';
import { FormComponent } from '../form/form.component';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Main component that handles the displaying of the tell us form and displays
 * server success/error response after submission of the form
 */
@Component({
  selector: 'tell-us-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrls: ['./tell-us.component.scss']
})
export class TellUsComponent implements OnInit {
  // the form dialog
  public dialogRef: MatDialogRef<FormComponent> = null;
  // promise representing showForm having been called in ngOnInit
  public initPromise: Promise<any>;
  // response received from form
  public response: any = null;
  // error response received from form
  public error: any = null;

  constructor(
    public dialog: MatDialog,
    public eventService: EventService,
    public location: Location
  ) {}

  ngOnInit() {
    this.initPromise = Promise.resolve().then(() => {
      this.showForm();
    });
  }

  /**
   * Handles the dialog closing, and checks to see if there is a dyfi response
   *
   * @param response
   *     dyfi response or HttpErrorResponse object
   */
  onDialogClose(response: any | HttpErrorResponse) {
    this.dialogRef = null;

    // check response
    if (response && response.your_cdi) {
      // success submitting form
      this.onSuccess(response);
    } else {
      // error submitting form
      this.onError(response);
    }
  }

  /**
   * Called when there was an error submitting the DYFI response
   *
   * @param response
   *     HttpErrorResponse object
   */
  onError(response: any) {
    this.error = response;
    console.log('form failed to submit: ', this.error);
  }

  /**
   * Called after dialog closes (either cancelled or submitted)
   *
   * @param response
   *     response object from earthquake-dyfi-response
   */
  onSuccess(response: any) {
    this.response = response;
    console.log('success!', this.response);
  }

  /**
   * Show the form dialog.
   */
  showForm() {
    this.dialogRef = this.dialog.open(FormComponent, {
      data: {
        eventService: this.eventService
      }
    });

    this.dialogRef.afterClosed().subscribe(response => {
      this.onDialogClose(response);
    });
  }
}
