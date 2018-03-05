import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'impact-pager-summary',
  templateUrl: './pager-summary.component.html',
  styleUrls: ['./pager-summary.component.css']
})
export class PagerSummaryComponent implements OnInit {

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

  @Input() products: Array<any> = [];


  constructor() {}

  ngOnInit() {}
}



