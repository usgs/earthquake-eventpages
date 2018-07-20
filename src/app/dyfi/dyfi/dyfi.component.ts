import {Component, OnInit} from '@angular/core';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'dyfi',
  templateUrl: './dyfi.component.html',
  styleUrls: ['./dyfi.component.scss']
})

export class DyfiComponent implements OnInit {

  constructor (public eventService: EventService) { }

  ngOnInit() { }

}
