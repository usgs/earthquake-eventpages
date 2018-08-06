import { Component, Input } from '@angular/core';


/**
 * Formats and styles preferred check mark icon for a title
 * @Input title
 *     Title of check mark icon
 */
@Component({
  selector: 'shared-preferred-check',
  templateUrl: './preferred-check.component.html',
  styleUrls: ['./preferred-check.component.css']
})


export class PreferredCheckComponent {

  @Input() title: string;

}
