import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../../event';
import { Tensor } from '../../shared/beachball/tensor';


@Component({
  selector: 'executive-focal-mechanism-pin',
  templateUrl: './focal-mechanism-pin.component.html',
  styleUrls: ['./focal-mechanism-pin.component.scss']
})
export class FocalMechanismPinComponent implements OnInit {

  private _product: any = null;

  public link = '../focal-mechanism';
  public title = 'Focal Mechanism';
  public tensor: Tensor = null;

  @Input() set product (product: any) {
    this._product = product;
    this.tensor = Tensor.fromProduct(product);
  }

  get product () {
    return this._product;
  }

  constructor () { }

  ngOnInit () { }

}
