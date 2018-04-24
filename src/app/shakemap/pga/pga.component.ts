import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'shakemap-pga',
  templateUrl: './pga.component.html',
  styleUrls: ['./pga.component.scss']
})
export class PgaComponent implements OnInit {

  constructor (public eventService: EventService) { }

  ngOnInit () {
  }

}
