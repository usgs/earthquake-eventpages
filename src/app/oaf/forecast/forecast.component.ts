import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';
import { OafService } from '../oaf.service';


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
    'numAftershocks': 'Most likely number of aftershocks (95 % confidence)',
    'probability': 'Probability of one or more aftershocks'
  };


  constructor (
    public eventService: EventService,
    public oafService: OafService
  ) { }

  ngOnInit () {
  }
}
