import { Component, Input } from '@angular/core';

@Component({
  selector: 'forecast-number-table',
  styleUrls: ['./forecast-number-table.component.scss'],
  templateUrl: './forecast-number-table.component.html'
})
export class ForecastNumberTableComponent {
  // colums to be displayed
  columnsToDisplay = ['space', 'day', 'week', 'month', 'year'];

  columnTitles = {
    day: 'Day',
    month: 'Month',
    space: '',
    week: 'Week',
    year: 'Year'
  };

  @Input() forecast: any;

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    forcast data
   */
  trackByIndex(index, item) {
    return index;
  }
}
