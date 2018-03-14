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

  public link = '../origin';
  @Input() product: any;
  public title = 'Origin';
  public type = 'origin';

  constructor(
    public formatterService: FormatterService
  ) { }

}
