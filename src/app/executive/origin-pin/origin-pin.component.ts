import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FormatterService } from '../../core/formatter.service';
import { Event } from '../../event';


/**
 * Origin Pin
 *
 * @param product
 *     origin product
 */
@Component({
  selector: 'executive-origin-pin',
  templateUrl: './origin-pin.component.html',
  styleUrls: ['./origin-pin.component.scss']
})

export class OriginPinComponent {

  public link = '../origin';
  public title = 'Origin';
  public type = 'origin';

  @Input() product: any;


  constructor(
    public formatterService: FormatterService
  ) { }

}
