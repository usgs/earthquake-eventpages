import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Display probability of aftershock at a certain magnitude threshold
 * with an expectation of the population to be affected.
 *
 * @param bin
 *     a forecast bin from the oaf product
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'oaf-commentary-details',
  styleUrls: ['./commentary-details.component.scss'],
  templateUrl: './commentary-details.component.html'
})
export class CommentaryDetailsComponent {
  @Input()
  bin: any;
}
