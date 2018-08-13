import { Component, Input } from '@angular/core';

/**
 * Display probability of aftershock at a certain magnitude threshold
 * with an expectation of the population to be affected.
 *
 * @param bin
 *     a forecast bin from the oaf product
 */
@Component({
  selector: 'oaf-commentary-details',
  templateUrl: './commentary-details.component.html',
  styleUrls: ['./commentary-details.component.scss']
})
export class CommentaryDetailsComponent {
  @Input()
  public bin: any;
}
