import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormLanguageService } from '../form-language.service';
import { EventService } from '../../../..';
import { Subscription } from 'rxjs';
import { Event } from '../../event';

import { LocationMapComponent } from 'hazdev-ng-location-input';


@Component({
  selector: 'tell-us-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit, OnDestroy {

  // these answers control whether the submit button is enabled
  // others are populated as needed
  public answers: any = {
    'fldSituation_felt': null,
    'ciim_mapLat': null,
    'ciim_mapLon': null,
    'ciim_time': null
  };

  @ViewChild(LocationMapComponent)
  locationMapComponent: LocationMapComponent;

  private eventSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public eventService: EventService,
    public languageService: FormLanguageService
  ) { }

  ngAfterViewInit () {
    this.eventSubscription = this.eventService.event$.subscribe((event) => {
      this.setEvent(event);
    });

    // disable scroll wheel zoom while map is in dialog
    if (this.locationMapComponent && this.locationMapComponent.map) {
      this.locationMapComponent.map.scrollWheelZoom.disable();
    }
  }

  ngOnDestroy () {
    this.eventSubscription.unsubscribe();
    this.eventSubscription = null;
  }

  /**
   * Update response information.
   *
   * @param answer
   *        object with answers, field(s) are keys, values are values.
   */
  onAnswer (answer: any) {
    if (!answer) {
      return;
    }
    // copy responses into answers
    for (const key of Object.keys(answer)) {
      this.answers[key] = answer[key];
    }
  }

  /**
   * Called when user clicks cancel.
   */
  onCancel () {
    this.dialogRef.close(false);
  }

  /**
   * Called when form is submitted.
   *
   * Passes answers back to dialog opener.
   */
  onSubmit () {
    // TODO: validation

    this.dialogRef.close(this.answers);
  }

  /**
   * Set event information.
   *
   * @param event the event.
   */
  setEvent (event: Event) {
    let time = event.properties.time || null;
    if (time) {
      time = new Date(time).toISOString();
    }

    this.answers.eventid = event.id;
    this.answers.ciim_time = time;
  }

  /**
   * Called when user selects a language.
   *
   * @param language selected language.
   */
  setLanguage (language: string) {
    this.languageService.getLanguage(language);
  }

}
