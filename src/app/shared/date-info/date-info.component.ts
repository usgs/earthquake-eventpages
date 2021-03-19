import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

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
export class DateInfoComponent{
  @Input()
  date: Date;
  @Input()
  local: boolean = false;
}
