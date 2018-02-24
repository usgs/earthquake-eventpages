import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { ContributorService } from '../../contributor.service';

@Component({
  selector: 'app-executive',
  templateUrl: './executive.component.html',
  styleUrls: ['./executive.component.css']
})
export class ExecutiveComponent implements OnInit {

  constructor (
    public eventService: EventService,
    public contributorService: ContributorService
  ) { }

  ngOnInit () {
  }
}
