import { Component, Input } from '@angular/core';

import { FormatterService } from '../../formatter.service';


@Component({
  selector: 'shared-uncertain-value',
  templateUrl: './uncertain-value.component.html',
  styleUrls: ['./uncertain-value.component.css']
})
export class UncertainValueComponent {

  @Input() value = '';
  @Input() uncertainty: number;
  @Input() uncertaintyUnits: string = null;

  constructor (
    public formatter: FormatterService
  ) { }

  hasUncertainty () {
    return (this.uncertainty || this.uncertainty === 0);
  }
}
