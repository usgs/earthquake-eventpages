import { Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

/**
 * Origin Pin
 *
 * @param product
 *     origin product
 */
@Component({
  selector: 'executive-origin-pin',
  styleUrls: ['./origin-pin.component.scss'],
  templateUrl: './origin-pin.component.html'
})
export class OriginPinComponent {
  link = '../origin';
  @Input()
  product: any;
  title = 'Origin';
  type = 'origin';

  constructor(public formatterService: FormatterService) {}
}
