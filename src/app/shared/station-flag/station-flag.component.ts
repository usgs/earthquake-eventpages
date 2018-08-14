import { Component, Input } from '@angular/core';

/**
 * Shows a flag description for each station
 *
 * @param flag
 *     The flag
 */
@Component({
  selector: 'shared-station-flag',
  styleUrls: ['./station-flag.component.scss'],
  templateUrl: './station-flag.component.html'
})
export class StationFlagComponent {
  @Input()
  flag: string;

  readonly FLAG_DESCRIPTIONS = {
    G: 'Glitch (clipped or below noise)',
    I: 'Incomplete time series',
    M: 'Manually flagged',
    N: 'Not in list of known stations',
    T: 'Outlier'
  };
}
