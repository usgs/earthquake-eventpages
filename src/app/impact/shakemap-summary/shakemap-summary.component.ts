import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';


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

  // labels for titles
  public columnTitles = {
    'catalog': 'Catalog',
    'mmi': 'MMI',
    'source': 'Source',
    'description': 'Description'
  };

  @Input() products: Array<any> = [];


  constructor() {}

  ngOnInit() {}
}
