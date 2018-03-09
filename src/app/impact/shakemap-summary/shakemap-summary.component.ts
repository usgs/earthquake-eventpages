import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '../../event';


@Component({
  selector: 'impact-shakemap-summary',
  templateUrl: './shakemap-summary.component.html',
  styleUrls: ['./shakemap-summary.component.css']
})
export class ShakemapSummaryComponent implements OnInit {

  // columns to be displayed
  public columnsToDisplay = [
    'catalog',
    'mmi',
    'source',
    'description'
  ];

  @Input() event: Event;

  @Input() products: Array<any> = [];

  constructor() {}

  ngOnInit() {}
}
