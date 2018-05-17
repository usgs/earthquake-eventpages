import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { MatSelectionListChange, MatRadioChange, MatListOption } from '@angular/material';
import { BehaviorSubject } from 'rxjs';


interface OtherValueEvent {
  type: 'other';
  value: any;
}


@Component({
  selector: 'tell-us-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

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

  // if there is an "other" option, the user specified value
  otherValue: any;

  constructor() { }

  ngOnInit() {
  }

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
