import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-summary-link',
  templateUrl: './summary-link.component.html',
  styleUrls: ['./summary-link.component.scss']
})
export class SummaryLinkComponent implements OnInit {

  @Input() event: any;
  @Input() productType: any;

  constructor() { }

  ngOnInit() {
  }

}
