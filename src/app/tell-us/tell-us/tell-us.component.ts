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
    this.response = response;
    if (response === false) {
      console.log('user clicked cancel');
      // todo: use router to navigate back?
    } else if (response) {
      // user clicked submit
      console.log('user clicked submit', response);
      // todo: submit response
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
