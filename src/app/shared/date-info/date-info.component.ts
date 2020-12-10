import { ChangeDetectionStrategy, Component, Input, OnChanges,} from '@angular/core';

/**
 * Shared date-info component for use displaying local/UTC dateTime
 *
 * @param date
 *     Date object of an event
 * @param local
 *     If time is supposed to be local
 */

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-date-info',
  templateUrl: './date-info.component.html',
  styleUrls: ['./date-info.component.scss']
})
export class DateInfoComponent implements OnChanges{
  @Input()
  date: Date;
  @Input()
  local: boolean = false;

  private UTC_OFFSET = 0 ;
  private LOCAL_OFFSET;

  ngOnChanges() {
    this.LOCAL_OFFSET = -(this.date.getTimezoneOffset());
  }
}
