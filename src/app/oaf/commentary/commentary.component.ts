import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';


@Component({
  selector: 'oaf-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent implements OnInit {

  constructor (
    public eventService: EventService
  ) { }

  ngOnInit () {
  }

}
