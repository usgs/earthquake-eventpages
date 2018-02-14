import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contributorList'
})
export class ContributorListPipe implements PipeTransform {

  transform(product: any, event = null, detailsMap = []): string {
    let eventSources,
        sources;

    try {
      eventSources = event.sources;
    } catch (e) {
      eventSources = [];
    }

    sources = this.getSources(product);
    return sources.map((sourceId: string) => {
      let details;

      // look up details for source
      details = detailsMap.find((item: any) => {
        return (
          item.id === sourceId ||
          (item.aliases && item.aliases.indexOf(sourceId) !== -1)
        );
      });

      return this.formatSource(sourceId, eventSources, details);
    }).join('');
  }

  formatSource(source: string, eventSources = null, details = null): string {
    const sourceId = source.toLowerCase();

    let text = `${sourceId.toUpperCase()}`;
    if (details) {
      text = `<abbr title="${details.title}">${text}</abbr>`;
    }
    const index = eventSources.indexOf(sourceId) + 1;

    return `<span>${text}<sup>${index}</sup></span>`;
  }

  getSources(product: any): Array<string> {
    const sources = new Set<string>();

    if (!product) {
      return [];
    }

    if (product.source) {
      sources.add(product.source.toLowerCase());
    }

    if (product.properties) {
      [
        'origin-source',
        'magnitude-source',
        'beachball-source'
      ].forEach((prop) => {
        if (product.properties[prop]) {
          sources.add(product.properties[prop].toLowerCase());
        }
      });
    }

    const sourceArray = Array.from(sources);
    sourceArray.sort();
    return sourceArray;
  }
}
