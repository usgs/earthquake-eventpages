import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '../../event';
import { FormatterService } from '../../core/formatter.service';

@Component({
  selector: 'executive-origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.scss']
})

export class OriginPinComponent {

  private _event: Event;
  public link = '../origin';
  public product: any;
  public title = 'Origin';
  public type = 'origin';

  // event passed from executive summary
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
