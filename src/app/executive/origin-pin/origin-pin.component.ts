import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '../../event';
import { FormatterService } from '../../formatter.service';

@Component({
  selector: 'executive-origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.scss']
})

export class OriginPinComponent {

  public link = '../origin';
  public product: any;
  public title = 'Origin';
  public type = 'origin';

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
