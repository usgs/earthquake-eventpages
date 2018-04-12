import { Component, OnInit } from '@angular/core';

import { EventService } from '../../core/event.service';


@Component({
  selector: 'ground-failure',
  templateUrl: './ground-failure.component.html',
  styleUrls: ['./ground-failure.component.scss']
})
export class GroundFailureComponent implements OnInit {

  constructor (
    public eventService: EventService
  ) { }

  ngOnInit() {
    this.eventService.product$.subscribe((product) => {
      console.log('next product', product);
    });
  }

}
