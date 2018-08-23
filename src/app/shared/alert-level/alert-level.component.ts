import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Shared alert-level component
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'shared-alert-level',
  styleUrls: ['./alert-level.component.scss'],
  templateUrl: './alert-level.component.html'
})
export class AlertLevelComponent {
  alertLevel: string;

  /**
   * Setter for the alert level color
   * @param alertColor
   *     Foreground color for alert
   */
  @Input()
  set alert(alertColor: string) {
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
