import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'summary-view',
  styleUrls: ['./summary-view.component.scss'],
  templateUrl: './summary-view.component.html'
})
export class SummaryViewComponent implements OnInit {
  @Input()
  product: any;

  constructor() {}

  ngOnInit() {}
}
