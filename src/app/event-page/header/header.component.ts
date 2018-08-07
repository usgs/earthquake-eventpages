import { Component, Input } from '@angular/core';


/**
 * Shared header component, shows header across all pages
 * @param event
 *     The event object
 */
@Component({
  selector: 'event-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() event: any;

}
