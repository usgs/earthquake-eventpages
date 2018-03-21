import { Component, OnInit, Input } from '@angular/core';
import { Tensor } from '../../shared/beachball/tensor';

@Component({
  selector: 'technical-focal-mechanism-summary',
  templateUrl: './focal-mechanism-summary.component.html',
  styleUrls: ['./focal-mechanism-summary.component.scss']
})
export class FocalMechanismSummaryComponent implements OnInit {

  public columnsToDisplay = [
    'catalog',
    'mechanism',
    'nodalPlane1',
    'nodalPlane2',
    'source'
  ];

 private _products: Array<any>;

  @Input() event: any;

  @Input() set products (products: Array<any>) {
    this._products = products;
    this.tensors = (products || []).map((p) => {
      return Tensor.fromProduct(p);
    });
  }

  get products () {
    return this._products;
  }

  public tensors: Array<any> = [];

  constructor () { }

  ngOnInit () {
  }

}

