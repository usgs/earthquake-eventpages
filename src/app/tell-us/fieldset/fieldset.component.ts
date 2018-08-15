import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Wraps the DYFI form input inside a fieldset element
 *
 * @param legend
 *     The legend text for the form fieldset
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tell-us-fieldset',
  styleUrls: ['./fieldset.component.scss'],
  templateUrl: './fieldset.component.html'
})
export class FieldsetComponent {
  @Input()
  legend: string;
}
