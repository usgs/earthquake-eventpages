import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'executive-tsunami-pin',
  templateUrl: './tsunami-pin.component.html',
  styleUrls: ['./tsunami-pin.component.scss']
})
export class TsunamiPinComponent implements OnInit {

  public href = 'https://www.tsunami.gov/';
  public title = 'Tsunami';
  public footer = 'NOAA';

  constructor() { }

  ngOnInit() { }

}
