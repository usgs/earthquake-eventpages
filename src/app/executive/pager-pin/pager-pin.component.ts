import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'executive-pager-pin',
  templateUrl: './pager-pin.component.html',
  styleUrls: ['./pager-pin.component.scss']
})
export class PagerPinComponent implements OnInit {

  public link = '../pager';
  public title = 'PAGER';

  @Input() product: any;

  constructor () { }

  ngOnInit () {
  }

}
