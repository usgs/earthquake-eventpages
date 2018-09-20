import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Segment } from '../segment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'result-table',
  styleUrls: ['./result-table.component.scss'],
  templateUrl: './result-table.component.html'
})
export class ResultTableComponent {
  // Result table headers
  columnsToDisplay = ['segment', 'strike', 'dip'];

  @Input()
  segments: Segment[];

  constructor() {}
}
