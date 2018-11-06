import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Event } from '../../event';
import { environment } from '../../../environments/environment';

/**
 * Main shared event page navigation component, shows all links relevant to
 * the event
 *
 * @param event
 *     The event object
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'event-page-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Input()
  event: Event = null;

  // set environment object for template
  scenario = environment.scenario;

  /**
   * Function to get the kml link from the event object
   *
   * @param event
   *     The event object
   * @returns
   *     KML link
   */
  getKmlLink(event: Event): string {
    if (this.scenario) {
      return `/scenarios/feed/v1.0/detail/${event.id}.kml`;
    } else {
      return `/earthquakes/feed/v1.0/detail/${event.id}.kml`;
    }
  }

  /**
   * Returns boolean to see whether or not the event has all products
   *
   * @param event
   *     The event object
   * @returns
   *     Boolean value of hasImpact
   */
  hasImpact(event: Event): boolean {
    return event.hasProducts([
      'dyfi',
      'impact-text',
      'impact-link',
      'losspager',
      'ground-failure',
      'shakemap'
    ]);
  }

  /**
   * Returns boolean to see if the event has all technical products
   *
   * @param event
   *     The event object
   * @returns
   *     Boolean value of hastechnical
   */
  hasTechnical(event: Event): boolean {
    return event.hasProducts([
      'origin',
      'phase-data',
      'moment-tensor',
      'focal-mechanism',
      'finite-fault',
      'oaf'
    ]);
  }
}
