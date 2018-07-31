import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'shakemap-uncertainty',
  templateUrl: './uncertainty.component.html',
  styleUrls: ['./uncertainty.component.scss']
})
export class UncertaintyComponent implements OnInit {

  constructor (public eventService: EventService) { }

  ngOnInit () {}
}
