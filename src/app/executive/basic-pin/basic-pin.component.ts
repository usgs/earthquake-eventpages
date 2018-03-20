import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '../../event';


@Component({
  selector: 'basic-pin',
  templateUrl: './basic-pin.component.html',
  styleUrls: ['./basic-pin.component.css']
})
export class BasicPinComponent {
  // router link for entire card action
  @Input() link;

  // product attribution
  // only used if subtitle is not provided
  @Input() product;

  // text for subtitle
  @Input() subtitle;

  // text for title
  @Input() title;

  constructor () { }

}
