import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Event } from '../../event';

/**
 * Regional Information Pin
 *
 * @param event
 *     event object
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'executive-region-info-pin',
  styleUrls: ['./region-info-pin.component.scss'],
  templateUrl: './region-info-pin.component.html'
})
export class RegionInfoPinComponent {
  @Input()
  event: Event;
  link = '../region-info';
  title = 'Regional Information';
}
