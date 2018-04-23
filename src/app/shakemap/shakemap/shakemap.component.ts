import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-shakemap',
  templateUrl: './shakemap.component.html',
  styleUrls: ['./shakemap.component.css']
})
export class ShakemapComponent implements OnInit {

  constructor (public eventService: EventService) { }

  ngOnInit () {
  }

}
