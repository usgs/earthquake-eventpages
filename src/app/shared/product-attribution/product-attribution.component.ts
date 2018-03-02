import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../event.service';
import { ContributorService } from '../../contributor.service';

@Component({
  selector: 'shared-product-attribution',
  templateUrl: './product-attribution.component.html',
  styleUrls: ['./product-attribution.component.css']
})
export class ProductAttributionComponent implements OnInit {

  @Input() product: any;

  constructor(
    public contributorService: ContributorService,
    public eventService: EventService
  ) { }

  ngOnInit() {
  }


  formatSource(source: string, eventSources: Array<string>, details = null): string {
    const sourceId = source.toLowerCase();

    let text = `${sourceId.toUpperCase()}`;
    if (details) {
      text = `<abbr title="${details.title}">${text}</abbr>`;
    }
    const index = eventSources.indexOf(sourceId) + 1;

    return `<span>${text}<sup>${index}</sup></span>`;
  }

  getSources(product: any, event: any, details: Array<any>): Array<any> {
    const sources = new Set<any>();

    if (!product) {
      return [];
    }

    const eventSources = (event && event.sources) ? event.sources : [];

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

    let sourceArray = Array.from(sources);
    sourceArray.sort();

    sourceArray = sourceArray.map((id) => {
      return {
        id: id.toUpperCase(),
        index: eventSources.indexOf(id) + 1,
        details: details.find((item: any) => {
          return (
            item.id === id ||
            (item.aliases && item.aliases.indexOf(id) !== -1)
          );
        })
      };
    });

    return sourceArray;
  }

}
