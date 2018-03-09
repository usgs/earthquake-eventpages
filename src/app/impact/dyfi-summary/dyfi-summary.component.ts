import { Component, Input, OnInit} from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '../../event';


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

  @Input() event: Event;

  @Input() products: Array<any> = [];

  constructor() {}

  ngOnInit() {}
}
