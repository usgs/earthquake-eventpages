import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eq-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.css']
})
export class EventHeaderComponent implements OnInit {

  @Input() event: any;

  constructor() { }

  ngOnInit() {
  }

}
