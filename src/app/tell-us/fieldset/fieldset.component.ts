import { Component, Input } from '@angular/core';

/**
 * Fieldset component which takes a legend component
 */
@Component({
  selector: 'tell-us-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent {

  /**
   * Legend input
   */
  @Input() legend: string;


  constructor () { }

}
