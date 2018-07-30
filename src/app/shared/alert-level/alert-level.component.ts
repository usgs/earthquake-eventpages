import { Component, Input } from '@angular/core';


/**
 * Shared alert-level component
 */
@Component({
  selector: 'shared-alert-level',
  templateUrl: './alert-level.component.html',
  styleUrls: ['./alert-level.component.scss']
})
export class AlertLevelComponent {


  public alertLevel: string;


  constructor() { }


  /**
   * Setter for the alert level color
   * @param {string} alertColor
   */
  @Input() set alert(alertColor: string) {
    this.alertLevel = alertColor;
  }

  /**
   * Getter for the alert's level property
   * @returns {string}
   */
  get alert() {
    return this.alertLevel;
  }

}
