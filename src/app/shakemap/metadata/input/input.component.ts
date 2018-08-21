import { Component, Input } from '@angular/core';

import { FormatterService } from '@core/formatter.service';

/**
 * Input subcomponent which shows input data when the user selects the 'metadata
 * ' tab from inside the main shakemap component
 *
 * @param smInput
 *     The shamekamp input object
 */
@Component({
  selector: 'shakemap-input',
  styleUrls: ['./input.component.scss', '../metadata.component.scss'],
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input()
  smInput: any;

  constructor(public formatter: FormatterService) {}
}
