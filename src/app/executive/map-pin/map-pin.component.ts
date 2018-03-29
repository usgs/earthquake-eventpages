import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'executive-map-pin',
  templateUrl: './map-pin.component.html',
  styleUrls: ['./map-pin.component.scss']
})
export class MapPinComponent implements OnInit {

  @Input() event: Event;

  link = '../map';
  title = 'Interactive Map';

  constructor() { }

  ngOnInit() {
  }

}
