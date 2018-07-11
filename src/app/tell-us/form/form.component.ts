import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormLanguageService } from '../form-language.service';
import { EventService } from '../../../..';
import { Subscription, Observable, of } from 'rxjs';
import { Event } from '../../event';

import { LocationMapComponent } from 'hazdev-ng-location-view';
import { catchError } from 'rxjs/operators';


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
    'ciim_time': null,
    'language': 'en'
  };
  public error: any = null;
  public responseUrl = '/data/dyfi/form/response.ph';

  @ViewChild(LocationMapComponent)
  locationMapComponent: LocationMapComponent;

  private eventSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public eventService: EventService,
    public httpClient: HttpClient,
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
    let params = new HttpParams();

    const validated = this.validateForm();


    if (validated) {
      for (const key in this.answers) {
        if (this.answers.hasOwnProperty(key)) {
          params = params.append(key, this.answers[key]);
        }
      }
      params = params.append('format', 'json');
      params = params.append('form_version', '1.10');

      // Post the form
      this.httpClient.post(this.responseUrl, params).pipe(
        catchError(this.handleError())
      ).subscribe((response) => {
        this.dialogRef.close(response);
      });
    }
  }

  /**
   * Checks to make sure that required fields were filled out
   * before submitting
   */
  validateForm () {
    let answer;
    const key = Object.keys(this.answers);

    // Validate all responses
    for (let i = 0, len = key.length; i < len; i++) {
      answer = this.answers[key[i]];
      if (!answer) {
        throw new Error('Not all of the required fields were submitted');
      }
    }

    return true;
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
    this.answers.language = language;
    this.languageService.getLanguage(language);
  }

  /**
   * Error handler for http requests.
   */
  private handleError() {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(error);
    };
  }
}
