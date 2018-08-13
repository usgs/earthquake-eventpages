import { Component, Input } from '@angular/core';

/**
 * Shared footer component across all pages
 *
 * @param event
 *     The event object
 * @param contributors
 *     The list of contributors to render in footer
 */
@Component({
  selector: 'event-page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input()
  event: any = null;
  @Input()
  contributors: any = null;
}
