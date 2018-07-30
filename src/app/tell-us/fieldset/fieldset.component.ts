import { Component, Input } from '@angular/core';


/**
 * Wraps the DYFI form input inside a fieldset element
 * @param legend {string}
 */
@Component({
  selector: 'tell-us-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent {

  @Input() legend: string;

}
