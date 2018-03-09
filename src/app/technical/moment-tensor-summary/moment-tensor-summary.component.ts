import { Component, OnInit, Input } from '@angular/core';

import { Tensor } from '../../shared/beachball/tensor';
import { FormatterService } from '../../core/formatter.service';

@Component({
  selector: 'technical-moment-tensor-summary',
  templateUrl: './moment-tensor-summary.component.html',
  styleUrls: ['./moment-tensor-summary.component.css']
})
export class MomentTensorSummaryComponent implements OnInit {

  public columnsToDisplay = [
    'catalog',
    'tensor',
    'magnitude',
    'depth',
    'percentDC',
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

  constructor(
    public formatterService: FormatterService
  ) { }

  ngOnInit () {
  }

}
