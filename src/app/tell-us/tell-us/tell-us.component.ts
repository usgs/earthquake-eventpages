import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Meta, DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { EventService } from '@core/event.service';
import { FormComponent } from '../form/form.component';

declare let window: any;
declare let FB: any;

/**
 * Main component that handles the displaying of the tell us form and displays
 * server success/error response after submission of the form
 */
@Component({
  selector: 'tell-us-tell-us',
  styleUrls: ['./tell-us.component.scss'],
  templateUrl: './tell-us.component.html'
})
export class TellUsComponent implements OnInit {
  // the form dialog
  dialogRef: MatDialogRef<FormComponent> = null;
  // error response received from form
  error: any = null;
  // get event for it's id property
  eventId = null;
  // facebook location for
  // promise representing showForm having been called in ngOnInit
  initPromise: Promise<any>;
  // whether or not we have the facebook sdk
  sdkStatus = false;
  // response received from form
  success: any = null;

  constructor(
    public dialog: MatDialog,
    public eventService: EventService,
    public location: Location,
    public meta: Meta,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.initPromise = Promise.resolve().then(() => {
      this.showForm();
    });
    this.eventService.event$.subscribe(event => {
      if (event && event.id !== null) {
        this.eventId = event.id;

        this.meta.addTags([
          {
            property: 'og:url',
            content: window.location.href
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:title',
            content: ''
          },
          {
            property: 'og:image',
            content: '../assets/usgs-logo-facebook.png'
          }
        ]);
      }
    });
  }

  /**
   * Load Facebook SDK
   */
  loadFacebookSdk() {
    // Initialize the facebook app
    window.fbAsyncInit = () => {
      FB.init({
        appId: '333236657410303',
        autoLogAppEvents: true,
        version: 'v2.10',
        xfbml: true
      });
      this.sdkStatus = true;
    };
    // Load the Facebook SDK
    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  /**
   * Handles the dialog closing, and checks to see if there is a dyfi response
   *
   * @param response
   *     dyfi response or HttpErrorResponse object
   */
  onDialogClose(response: any | HttpErrorResponse) {
    this.dialogRef = null;
    this.error = null;
    this.success = null;

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

  onSocialClick(e) {
    e.preventDefault();
    this.showFacebookSharePopup();
    // this.loadFacebookSdk();
  }

  /**
   * Called after dialog closes (either cancelled or submitted)
   *
   * @param response
   *     response object from earthquake-dyfi-response
   */
  onSuccess(response: any) {
    this.success = response;
<<<<<<< HEAD
=======
    console.log('success!', this.success);
    this.loadFacebookSdk();
  }

  /**
   * Show facebook share popup
   */
  showFacebookSharePopup() {
    const message = `
      My DYFI intensity was ${this.success.your_cdi}, Did you feel it?
    `;
    if (this.sdkStatus) {
      FB.ui({
        action_properties: JSON.stringify({
          object: {
            'og:description': message,
            'og:title': this.meta.getTag('property="og:title"').content,
            'og:url': window.location.href
          }
        }),
        action_type: 'og.shares',
        href: window.location.href,
        method: 'share_open_graph'
      });
    }
>>>>>>> share functionality in place, need to fix the broken share button
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
