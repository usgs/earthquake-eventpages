import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ground-failure-type',
  styleUrls: ['./ground-failure-type.component.scss'],
  templateUrl: './ground-failure-type.component.html'
})
export class GroundFailureTypeComponent implements OnInit {
  @Input()
  buttonQueryParams: any;
  @Input()
  hazardAlertColor: String;
  @Input()
  hazardAlertValue: String;
  @Input()
  populationAlertColor: String;
  @Input()
  populationAlertValue: String;
  @Input()
  type: String;

  constructor() {}

  ngOnInit() {}
}
