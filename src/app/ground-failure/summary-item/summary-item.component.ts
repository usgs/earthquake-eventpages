import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'summary-item',
  styleUrls: ['./summary-item.component.scss'],
  templateUrl: './summary-item.component.html'
})
export class SummaryItemComponent implements OnInit {
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
