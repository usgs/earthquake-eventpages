import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { EventService } from '../../core/event.service';
import { FormComponent } from '../form/form.component';


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

  // state of form submission
  public success = false;

  constructor (
    public dialog: MatDialog,
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.initPromise = Promise.resolve().then(() => {
      this.showForm();
    });
  }

  /**
   * Called after dialog closes (either cancelled or submitted).
   *
   * @param response
   *        false if user clicked cancel,
   *        response object if user clicked submit,
   *        undefined if user closed dialog another way.
   */
  onResponse (response) {
    if (response === null) {
      // todo: use router to navigate back?
      console.log('user clicked cancel');
      return;
    }

    this.response = response;

    if (response && response.your_cdi) {
      // user successfully submitted the form
      console.log('success!', response);
      this.success = true;
    } else {
      // error while submitting the form
      console.log('form failed to submit: ', response.message);
    }
  }

  /**
   * Show the form dialog.
   */
  showForm () {
    this.dialogRef = this.dialog.open(FormComponent, {
      data: {
        eventService: this.eventService
      }
    });

    this.dialogRef.afterClosed().subscribe((response) => {
      this.dialogRef = null;
      if (response !== null) {
        this.onResponse(response);
      }
    });
  }

}
