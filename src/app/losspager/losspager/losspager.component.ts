import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-losspager',
  templateUrl: './losspager.component.html',
  styleUrls: ['./losspager.component.scss']
})
export class LosspagerComponent implements OnInit {

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

}
