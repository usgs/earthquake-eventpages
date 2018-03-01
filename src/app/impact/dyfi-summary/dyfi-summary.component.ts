import { Component, Input, OnInit} from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event.service';
import { FormatterService } from '../../formatter.service';

@Component({
  selector: 'impact-dyfi-summary',
  templateUrl: './dyfi-summary.component.html',
  styleUrls: ['./dyfi-summary.component.css']
})
export class DyfiSummaryComponent implements OnInit {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'cdi',
    'responses',
    'source'
  ];

  // labels for titles
  public columnTitles = {
    'catalog': 'Catalog',
    'cdi': 'CDI',
    'responses': 'Responses',
    'source': 'Source'
  };

  @Input() products: Array<any> = [];

  public dyfiData: Array<any>;

  private eventSubscription: Subscription;


  constructor(
    public eventService: EventService,
    public formatterService: FormatterService
  ) { }

  ngOnInit() {}

  onEvent (event: any) {
    const products = event.getProducts('dyfi');
    let data;

    if (products.length === 0) {
      data = [];
    } else {
      data = products.map((product) => {
        return {
          'catalog': product.properties.eventsource,
          'cdi': product.properties.maxmmi,
          'responses': product.properties.numResp,
          'source': product.source
        };
      });
    }

    this.dyfiData = data;
  }
}
