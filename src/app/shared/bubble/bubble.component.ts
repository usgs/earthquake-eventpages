import { Component, Input } from '@angular/core';

/**
 * Shared bubble component for use in beachball components
 *
 * @param name
 *     The name value
 * @param title
 *     The title of the bubble
 */
@Component({
  selector: 'shared-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss']
})
export class BubbleComponent {
  @Input()
  name: string;
  @Input()
  title: string;
}
