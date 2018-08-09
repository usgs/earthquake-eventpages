import { Component, Input } from '@angular/core';


/**
 * Formats and styles preferred check mark icon for a title
 *
 * @param title
 *     description for the abbreviation
 */
@Component({
  selector: 'shared-preferred-check',
  templateUrl: './preferred-check.component.html',
  styleUrls: ['./preferred-check.component.scss']
})
export class PreferredCheckComponent {

  @Input() title: string;

}
