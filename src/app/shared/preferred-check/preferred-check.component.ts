import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Formats and styles preferred check mark icon for a title
 *
 * @param title
 *     description for the abbreviation
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-preferred-check',
  styleUrls: ['./preferred-check.component.scss'],
  templateUrl: './preferred-check.component.html'
})
export class PreferredCheckComponent {
  @Input()
  title: string;
}
