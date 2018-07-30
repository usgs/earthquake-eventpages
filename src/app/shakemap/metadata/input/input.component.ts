import { Component, Input } from '@angular/core';

import { FormatterService } from '../../../core/formatter.service';


/**
 * Input subcomponent which shows input data when the user selects the 'metadata
 * ' tab from inside the main shakemap component
 * @param smInput { any }
 */
@Component({
  selector: 'shakemap-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() smInput: any;


  constructor (public formatter: FormatterService) { }

}
