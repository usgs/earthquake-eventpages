import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';


@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.css']
})
export class ImpactComponent implements OnInit {

  constructor (
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

}
