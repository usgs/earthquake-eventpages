import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'executive-dyfi-pin',
  templateUrl: './dyfi-pin.component.html',
  styleUrls: ['./dyfi-pin.component.scss']
})
export class DyfiPinComponent implements OnInit {

  public link = '../dyfi';
  public title = 'Did You Feel It?';

  @Input() product: any;

  constructor() { }

  ngOnInit() {
  }

}
