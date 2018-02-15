import { Component } from '@angular/core';

import { EventService } from '../../event.service';

@Component({
  selector: 'origin-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  constructor(
    public eventService: EventService
  ) { }

  toJson (data: any): string {
    return JSON.stringify(data, null, 2);
  }

}
