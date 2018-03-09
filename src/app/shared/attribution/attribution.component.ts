import { Component, Input, OnInit } from '@angular/core';

import { Event } from '../../event';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';


@Component({
  selector: 'shared-attribution',
  templateUrl: './attribution.component.html',
  styleUrls: ['./attribution.component.css']
})
export class AttributionComponent implements OnInit {

  @Input() sourceCode: string;

  constructor (
    public readonly contributorService: ContributorService,
    public readonly eventService: EventService
  ) { }

  ngOnInit () {
  }

  hasIndex (source) {
    return (source.index || source.index === 0);
  }

  sourceCodeToInfo (sourceCode: string, event: Event = null,
      details: Array<any> = []): any {
    let id;
    const eventSources = (event && event.sources) ? event.sources : [];

    if (!sourceCode) {
      return '';
    }

    id = sourceCode.toLowerCase();

    const detailInfo = details.find((item) => {
     return (
       item.id === id ||
       (item.aliases && item.aliases.indexOf(id) !== -1)
     );
    });

    if (detailInfo) {
      // reset id to be the mapped details id in case an alias matched
      id = detailInfo.id.toLowerCase();
    }


    return {
      id: id.toUpperCase(),
      index: eventSources.indexOf(id) + 1,
      details: detailInfo
    };
  }
}
