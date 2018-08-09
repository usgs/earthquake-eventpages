import { Pipe, PipeTransform } from '@angular/core';

import { Event } from '../event';


@Pipe({
  name: 'contributorList'
})
export class ContributorListPipe implements PipeTransform {


  /**
   * Returns a list of contributors from the event data
   *
   * @param event
   *     The event object
   * @param detailsMap
   *     The details array filled with html data
   * @returns
   *     Contributors list formatted
   */
  transform (event: Event, detailsMap = []): string {
    let sources;

    try {
      sources = event.sources || [];
    } catch (e) {
      sources = [];
    }

    return sources.map((sourceId: string) => {
      let details,
          result;

      sourceId = sourceId.toLowerCase();
      details = detailsMap.find((item: any) => {
        return (
          item.id === sourceId ||
          (item.aliases || []).indexOf(sourceId) !== -1
        );
      });

      if (details) {
        result = `<li><a href="${details.url}">${details.title}</a></li>`;
      } else {
        result = `<li>${sourceId.toUpperCase()}</li>`;
      }

      return result;
    }).join('');
  }

}
