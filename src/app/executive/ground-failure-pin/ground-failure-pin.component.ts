import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'executive-ground-failure-pin',
  templateUrl: './ground-failure-pin.component.html',
  styleUrls: ['./ground-failure-pin.component.scss']
})
export class GroundFailurePinComponent implements OnInit {

  @Input() product: any;
  @Input() landslidesAreaAlert: 'green' | 'yellow' | 'orange' | 'red';
  @Input() landslidesPopulationAlert: 'green' | 'yellow' | 'orange' | 'red';
  @Input() liquefactionAreaAlert: 'green' | 'yellow' | 'orange' | 'red';
  @Input() liquefactionPopulationAlert: 'green' | 'yellow' | 'orange' | 'red';

  public link = '../ground-failure';
  public title = 'Ground Failure';

  constructor () { }

  ngOnInit () { }

}
