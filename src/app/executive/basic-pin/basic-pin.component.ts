import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Event } from '../../event';


@Component({
  selector: 'basic-pin',
  templateUrl: './basic-pin.component.html',
  styleUrls: ['./basic-pin.component.css']
})
export class BasicPinComponent {

  @Input() action; // router link for action button
  @Input() link; // router link for entire card action
  @Input() product; // product being displayed
  @Input() subtitle; // text for subtitle
  @Input() title; // text for title

  constructor () { }

}
