import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contributorList'
})
export class ContributorListPipe implements PipeTransform {

  transform(product: any, detailsMap = [], event = null): string {
    let eventSources,
        sources;

    try {
      eventSources = event.properties.sources.split(',');
      eventSources = eventSources.filter((s) => !!s);
      eventSources.sort();
    } catch (e) {
      eventSources = [];
    }

    sources = this.getProductSources(product);
    return sources.map((sourceId: string) => {
      let details;

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

      let text = `${sourceId.toUpperCase()}`;
      if (details) {
        text = `<abbr title="${details.title}">${text}</abbr>`;
      }
      const index = eventSources.indexOf(sourceId) + 1;

      return `<span class="contributor-reference">${text}<sup>${index}</sup></span>`
    }).join('');
  }

  getProductSources(product: any): string[] {
    const sources = {};
    sources[product.source] = true;
    [
      'origin-source',
      'magnitude-source',
      'beachball-source'
    ].forEach((prop) => {
      if (product.properties[prop]) {
        sources[product.properties[prop]] = true;
      }
    });
    return Object.keys(sources);
  }
}
