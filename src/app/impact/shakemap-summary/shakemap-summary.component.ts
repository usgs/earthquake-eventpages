import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

@Component({
  selector: 'impact-shakemap-summary',
  templateUrl: './shakemap-summary.component.html',
  styleUrls: ['./shakemap-summary.component.css']
})
export class ShakemapSummaryComponent implements OnInit, OnDestroy {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'mmi',
    'source',
    'description'
  ];

  // labels for titles
  public columnTitles = {
    'catalog': 'Catalog',
    'mmi': 'MMI',
    'source': 'Source',
    'description': 'Description'
  };

  public shakemapData: Array<any>;

  private eventSubscription: Subscription;

  constructor(
    public eventService: EventService,
    public formatterService: FormatterService
  ) { }

  ngOnInit() {
    this.eventSubscription = this.eventService.event$.subscribe((event) => {
      this.onEvent(event);
    });
  }

  ngOnDestroy () {
    this.eventSubscription.unsubscribe();
  }

  onEvent ( event: any) {
    const products = event.getProducts('shakemap');
    let data;

    if (products.length === 0) {
      data = [];
    } else {
      data = products.map((product) => {
        return {
          'catalog': product.properties.eventsource,
          'mmi': product.properties.maxmmi,
          'source': product.source,
          'description': product.properties['event-description']
        };
      });
    }

    this.shakemapData = data;
  }
}
