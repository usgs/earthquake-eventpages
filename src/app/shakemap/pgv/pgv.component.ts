import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'shakemap-pgv',
  templateUrl: './pgv.component.html',
  styleUrls: ['./pgv.component.scss']
})
export class PgvComponent implements OnInit {

  constructor (public eventService: EventService) { }

  ngOnInit () {
  }

}
