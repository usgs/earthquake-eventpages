import { Component, Input, OnChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { FormatterService } from '../../formatter.service';

import { Event } from '../../event';

@Component({
  selector: 'executive-origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.scss']
})
export class OriginPinComponent {

  public product: any = null;
  public title = 'Origin';

  private _event: Event;

  @Input() set event (event: Event) {
    this._event = event;
    if (event) {
      this.product = event.getProduct('origin');
    } else {
      this.product = null;
    }
  }

  get event () {
    return this._event;
  }

  constructor(
    public formatterService: FormatterService
  ) { }

}
