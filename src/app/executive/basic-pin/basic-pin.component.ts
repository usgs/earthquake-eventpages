import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '../../event';


@Component({
  selector: 'basic-pin',
  templateUrl: './basic-pin.component.html',
  styleUrls: ['./basic-pin.component.css']
})
export class BasicPinComponent {

  private _event: Event;
  public product;

  @Input() action; // router link for action button
  @Input() link; // router link for entire card action
  @Input() subtitle; // text for subtitle
  @Input() title; // text for title
  @Input() type; // type of product

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

  constructor () { }

}
