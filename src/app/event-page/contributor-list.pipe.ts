import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../event';

@Pipe({
  name: 'contributorList'
})
export class ContributorListPipe implements PipeTransform {

  transform(event: Event, detailsMap = []): string {
    return event.sources.map((sourceId: string) => {
      let details,
          result;

      if (!sourceId) {
        return '';
      }

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
