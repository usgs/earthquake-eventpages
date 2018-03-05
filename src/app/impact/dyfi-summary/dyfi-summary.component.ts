import { Component, Input, OnInit} from '@angular/core';
import { MatDialog, Sort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

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


  constructor(
    public formatterService: FormatterService
  ) { }

  ngOnInit() {}
}
