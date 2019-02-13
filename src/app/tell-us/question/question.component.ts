import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TellUsText } from '../form-language/tell-us-text';

/**
 * The question form component
 *
 * @param label
 *     The form label
 * @param labels
 *     Translation strings mapping
 * @param model
 *     Model to render
 * @param multiSelect
 *     Multiselect options on form
 * @param name
 *     The name input on form
 * @param options
 *     Other form options input
 *
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tell-us-question',
  styleUrls: ['./question.component.scss'],
  templateUrl: './question.component.html'
})
export class QuestionComponent {
  @Input()
  label: string;
  @Input()
  labels: TellUsText;
  @Input()
  model: any;
  @Input()
  multiSelect = false;
  @Input()
  name: string;
  @Input()
  options: Array<any>;

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    question item
   */
  trackByIndex(index, item) {
    return index;
  }
}
