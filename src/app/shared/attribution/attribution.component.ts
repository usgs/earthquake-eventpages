import { Component, Input } from '@angular/core';

import { ContributorService } from '@core/contributor.service';
import { EventService } from '@core/event.service';
import { Event } from '../../event';

/**
 * Attribution component
 *
 * @param sourceCode
 *     The actual source code for attribution
 */
@Component({
  selector: 'shared-attribution',
  styleUrls: ['./attribution.component.scss'],
  templateUrl: './attribution.component.html'
})
export class AttributionComponent {
  @Input()
  sourceCode: string;

  constructor(
    readonly contributorService: ContributorService,
    readonly eventService: EventService
  ) {}

  /**
   * Converts source code to informational data
   *
   * @param sourceCode
   *     The source code for attribution
   * @param event
   *     The event object
   * @param details
   *     Attribution details for this event
   */
  sourceCodeToInfo(
    sourceCode: string,
    event: Event = null,
    details: Array<any> = []
  ): any {
    let id;
    const eventSources = event && event.sources ? event.sources : [];

    if (!sourceCode) {
      return '';
    }

    id = sourceCode.toLowerCase();

    const detailInfo = details.find(item => {
      return (
        item.id === id || (item.aliases && item.aliases.indexOf(id) !== -1)
      );
    });

    if (detailInfo) {
      // reset id to be the mapped details id in case an alias matched
      id = detailInfo.id.toLowerCase();
    }

    return {
      details: detailInfo,
      id: id.toUpperCase(),
      index: eventSources.indexOf(id) + 1
    };
  }
}
