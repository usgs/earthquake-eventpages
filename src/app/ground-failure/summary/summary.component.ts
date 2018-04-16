import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../..';

@Component({
  selector: 'ground-failure-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

}
