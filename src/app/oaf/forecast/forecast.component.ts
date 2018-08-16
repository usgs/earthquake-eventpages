import { Component } from '@angular/core';

import { EventService } from '@core/event.service';
import { OafService } from '../oaf.service';


/**
 * Display forecaset information in tab on OAF product page
 */
@Component({
  selector: 'oaf-forecast',
  styleUrls: ['./forecast.component.scss'],
  templateUrl: './forecast.component.html'
})
export class ForecastComponent {
  // colums to be displayed
  columnsToDisplay = ['space', 'day', 'week', 'month', 'year'];

  columnTitles = {
    day: 'Day',
    month: 'Month',
    space: '',
    week: 'Week',
    year: 'Year'
  };

  constructor(
    public eventService: EventService,
    public oafService: OafService
  ) {}

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    forcast data
   */
  trackByIndex (index, item) {
    return index;
  }
}
