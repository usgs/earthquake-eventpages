import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'tell-us-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  name = 'location';

  @Output()
  location = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
