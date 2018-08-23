import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Shared bubble component for use in beachball components
 *
 * @param name
 *     The name value
 * @param title
 *     The title of the bubble
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-bubble',
  styleUrls: ['./bubble.component.scss'],
  templateUrl: './bubble.component.html'
})
export class BubbleComponent {
  @Input()
  name: string;
  @Input()
  title: string;
}
