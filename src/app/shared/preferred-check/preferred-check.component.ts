import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-preferred-check',
  templateUrl: './preferred-check.component.html',
  styleUrls: ['./preferred-check.component.css']
})

/**
 * Formats and styles preferred check mark.
 *
 * @Input TITLE {string}
 *     Title of check mark icon
 */
export class PreferredCheckComponent implements OnInit {

  @Input() TITLE: string;

  constructor() { }

  ngOnInit() {
  }

}
