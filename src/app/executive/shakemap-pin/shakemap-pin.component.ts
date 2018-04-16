import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'executive-shakemap-pin',
  templateUrl: './shakemap-pin.component.html',
  styleUrls: ['./shakemap-pin.component.scss']
})
export class ShakemapPinComponent implements OnInit {

  public _event: any;
  public link = '../shakemap';
  public product: any;
  public title = 'ShakeMap';

  @Input()
  set event (event) {
    this._event = event;

    if (event) {
      this.product = event.getProduct('shakemap');
    }
  }

  get event () {
    return this._event;
  }

  constructor () { }


  ngOnInit () {
  }

}
