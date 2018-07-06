import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'shakemap-psa',
  templateUrl: './psa.component.html',
  styleUrls: ['./psa.component.scss']
})
export class PsaComponent implements OnInit {

  constructor (public eventService: EventService) { }

  ngOnInit () {
  }

}
