import { Component } from '@angular/core';

import { EventService } from '../../core/event.service';
import { OafService } from '../oaf.service';


/**
 * Display forecaset information in tab on OAF product page
 */
@Component({
  selector: 'oaf-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {

  // colums to be displayed
  public columnsToDisplay = [
    'space',
    'day',
    'week',
    'month',
    'year'
  ];

  public columnTitles = {
    'space': '',
    'day': 'Day',
    'week': 'Week',
    'month': 'Month',
    'year': 'Year'
  };


  constructor (
    public eventService: EventService,
    public oafService: OafService
  ) { }
}
