import {
  HttpClient, HttpErrorResponse, HttpParams
} from '@angular/common/http';
import {
  AfterContentInit, Component, Inject, OnDestroy, ViewChild
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { catchError } from 'rxjs/operators';
import { Subscription, Observable, of } from 'rxjs';

import { EventService } from '../../../..';
import { Event } from '../../event';
import { FormLanguageService } from '../form-language.service';
import { LocationMapComponent } from 'hazdev-ng-location-view';


/**
 * The main tell-us form
 */
@Component({
  selector: 'tell-us-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterContentInit, OnDestroy {


  // these answers control whether the submit button is enabled
  // others are populated as needed
  public answers: any = {
    'fldSituation_felt': null,
    'ciim_mapLat': null,
    'ciim_mapLon': null,
    'ciim_time': null
  };
  public error: any = null;
  public responseUrl = '/data/dyfi/form/response.php';

  // The rendered map at the top of the form
  @ViewChild(LocationMapComponent)
  locationMapComponent: LocationMapComponent;

  // The subscription to the event$ observable in the event service
  private eventSubscription: Subscription;


  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public eventService: EventService,
    public httpClient: HttpClient,
    public languageService: FormLanguageService
  ) { }


  /**
   * Subscribe to the event$ object in event service
   */
  ngAfterContentInit () {
    this.eventSubscription = this.eventService.event$.subscribe((event) => {
      this.setEvent(event);
    });

    // default language
    this.answers.language = 'en';

    // disable scroll wheel zoom while map is in dialog
    if (this.locationMapComponent && this.locationMapComponent.map) {
      this.locationMapComponent.map.scrollWheelZoom.disable();
    }
  }

  /**
   * Kill subscription to event service and nullify
   */
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
    let key;
    const errors = [];
    const required = [
      'fldSituation_felt',
      'ciim_mapLat',
      'ciim_mapLon',
      'ciim_time'
    ];

    // Validate all responses
    for (let i = 0, len = required.length; i < len; i++) {
      key = required[i];
      if (!this.answers.hasOwnProperty(key) || this.answers[key] === null) {
        errors.push(key);
      }
    }

    if (errors.length > 0) {
      throw new Error('Required fieldsx` missing: ' + errors.join(', '));
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
  private handleError () {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(error);
    };
  }
}
