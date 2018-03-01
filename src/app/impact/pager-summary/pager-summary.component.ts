import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

@Component({
  selector: 'impact-pager-summary',
  templateUrl: './pager-summary.component.html',
  styleUrls: ['./pager-summary.component.css']
})
export class PagerSummaryComponent implements OnInit, OnDestroy {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'alertlevel',
    'source'
  ];

  // labels for titles
  public columnTitles = {
    'catalog': 'Catalog',
    'alertlevel': 'Alert Level',
    'source': 'Source'
  };

  public pagerData: Array<any>;

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

  onEvent (event: any) {
    const products = event.getProducts('losspager');
    let data;

    if (products.length === 0) {
      data = [];
    } else {
      console.log('temp');
      data = products.map((product) => {
        return {
          'catalog': product.properties.eventsource,
          'alertlevel': product.properties.alertlevel,
          'source': product.source
        };
      });
    }

    this.pagerData = data;
  }
}



