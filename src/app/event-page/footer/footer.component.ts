import {  ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Shared footer component across all pages
 *
 * @param event
 *     The event object
 * @param contributors
 *     The list of contributors to render in footer
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event-page-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input()
  contributors: any = null;
  @Input()
  event: any = null;
}
