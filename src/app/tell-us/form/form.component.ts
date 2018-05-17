import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormLanguageService } from '../form-language.service';
import { EventService } from '../../../..';
import { Subscription } from 'rxjs';
import { Event } from '../../event';


@Component({
  selector: 'tell-us-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  // these answers control whether the submit button is enabled
  // others are populated as needed
  public answers: any = {
    'fldSituation_felt': null,
    'ciim_mapLat': null,
    'ciim_mapLon': null,
    'ciim_time': null
  };

  private eventSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public eventService: EventService,
    public languageService: FormLanguageService
  ) { }

  ngOnInit () {
    this.eventSubscription = this.eventService.event$.subscribe((event) => {
      this.setEvent(event);
    });
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
