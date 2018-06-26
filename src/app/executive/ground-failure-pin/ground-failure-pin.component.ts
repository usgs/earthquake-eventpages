import { Component, OnInit, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material';

@Component({
  selector: 'executive-ground-failure-pin',
  templateUrl: './ground-failure-pin.component.html',
  styleUrls: ['./ground-failure-pin.component.scss']
})
export class GroundFailurePinComponent implements OnInit {

  @Input() product: any;

  public link = '../ground-failure';
  public title = 'Ground Failure';

  constructor () { }

  ngOnInit () { }

}
