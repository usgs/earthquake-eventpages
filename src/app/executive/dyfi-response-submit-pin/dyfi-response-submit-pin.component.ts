import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'executive-dyfi-response-submit-pin',
  templateUrl: './dyfi-response-submit-pin.component.html',
  styleUrls: ['./dyfi-response-submit-pin.component.scss']
})
export class DyfiResponseSubmitPinComponent implements OnInit {

  public link = '../tellus';
  @Input() product: any;
  public title = 'Felt Report - Tell Us!';
  constructor() { }

  ngOnInit() {
  }

}
