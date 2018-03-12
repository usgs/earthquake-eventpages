import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../event';
import { Tensor } from '../../shared/beachball/tensor';

@Component({
  selector: 'executive-moment-tensor-pin',
  templateUrl: './moment-tensor-pin.component.html',
  styleUrls: ['./moment-tensor-pin.component.scss']
})
export class MomentTensorPinComponent implements OnInit {

  private _product: any = null;

  public title = 'Moment Tensor';
  public tensor: Tensor = null;

  @Input() set product (product: any) {
    this._product = product;
    this.tensor = Tensor.fromProduct(product);
  }

  get product () {
    return this._product;
  }

  constructor () { }

  ngOnInit() { }

}
