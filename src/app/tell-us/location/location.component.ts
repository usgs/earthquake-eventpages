import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'tell-us-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Output()
  change = new BehaviorSubject<any>(null);

  // label for user to enter location
  @Input()
  enter = 'Choose location';

  // label for user to change previously entered location
  @Input()
  update = 'Change location';

  // current location value
  @Input()
  value: any = {
    ciim_mapLat: null,
    ciim_mapLon: null
  };

  constructor() { }

  ngOnInit() {
  }

  clearLocation () {
    this.value = {
      ciim_mapAddress: null,
      ciim_mapConfidence: null,
      ciim_mapLat: null,
      ciim_mapLon: null
    };

    this.change.next(this.value);
  }

  enterLocation () {
    this.value = {
      ciim_mapAddress: '1711 Illinois Street, Golden, CO',
      ciim_mapConfidence: 5,
      ciim_mapLat: 39.74951,
      ciim_mapLon: -105.22134
    };

    this.change.next(this.value);
  }

}
