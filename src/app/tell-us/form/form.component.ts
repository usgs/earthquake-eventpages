import { Component, OnChanges, SimpleChanges } from '@angular/core';

import { Event } from './../../event';
import { AbstractForm } from './abstract-form.component';

/**
 * The main tell-us form which submits all DYFI information from user
 *
 */
@Component({
  selector: 'tell-us-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html'
})
export class FormComponent extends AbstractForm implements OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('event')) {
      this.onEvent(changes.event.currentValue);
    }
  }

  onEvent(event: Event): void {
    if (event && event.id) {
      let time = event.properties.time || null;
      if (time) {
        time = new Date(time).toISOString();
      }

      this.feltReport.eventid = event.id;
      this.feltReport.ciim_time = time;
    } else {
      this.feltReport.eventid = null;
      this.feltReport.ciim_time = null;
    }
  }
}
