import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

}
