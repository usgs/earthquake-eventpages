import { Component, Output, Input } from '@angular/core';
import {
  MatSelectionListChange,
  MatRadioChange,
  MatListOption
} from '@angular/material';

import { BehaviorSubject } from 'rxjs';


/**
 * Interface for user to enter data under any of the 'other' radio buttons
 */
interface OtherValueEvent {
  type: 'other';
  value: any;
}


/**
 * The question form component
 */
@Component({
  selector: 'tell-us-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {


  // if there is an "other" option, the user specified value
  public otherValue: any;

  @Output()
  change = new BehaviorSubject<any>(null);

  @Input()
  label: string;

  @Input()
  multiSelect = false;

  @Input()
  name: string;

  @Input()
  options: Array<any>;

  @Input()
  value: any;


  /**
   * Convert UI value changes to answer values.
   *
   * @param changeEvent UI selection change.
   */
  onChange (changeEvent: MatRadioChange|MatSelectionListChange|OtherValueEvent) {
    if (changeEvent instanceof MatRadioChange) {
      // single select
      this.value = changeEvent.value;
    } else if (changeEvent instanceof MatSelectionListChange) {
      // multi select
      this.value = changeEvent.source.selectedOptions.selected.map((option: MatListOption) => {
        return option.value;
      });
    } else if (changeEvent) {
      this.otherValue = changeEvent.value;
    }

    const next = {};
    next[this.name] = this.value;
    if (this.otherValue !== undefined) {
      next[this.name + '_Other'] = this.otherValue;
    }
    this.change.next(next);
  }

}
