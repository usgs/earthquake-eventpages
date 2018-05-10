import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';
import { OafService } from '../oaf.service';


@Component({
  selector: 'oaf-commentary',
  templateUrl: './commentary.component.html',
  styleUrls: ['./commentary.component.scss']
})
export class CommentaryComponent {

  constructor (
    public eventService: EventService,
    public oafService: OafService
  ) { }

}
