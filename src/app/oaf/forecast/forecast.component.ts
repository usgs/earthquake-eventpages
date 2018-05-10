import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';


@Component({
  selector: 'oaf-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  // colums to be displayed
  public columnsToDisplay = [
    'magRange',
    'numAftershocks',
    'probability'
  ];

  public columnTitles = {
    'magRange': 'Magnitude (M) range of aftershocks considered',
    'numAftershocks': 'Most likely number of aftershocks (95 % condidence)',
    'probability': 'Probability of one or more aftershocks'
  };


  constructor (
    public eventService: EventService
  ) { }

  ngOnInit () {
  }

  parse (product: any): any {
    let json;
    try {
      json = JSON.parse(product.contents[''].bytes);
      console.log(json.forecast);
      return json.forecast;
    } catch (e) {
      return null;
    }
  }

}
