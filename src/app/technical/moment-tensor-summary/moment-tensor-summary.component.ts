import { Component, OnInit, Input } from '@angular/core';

import { Tensor } from '../../shared/tensor';

@Component({
  selector: 'technical-moment-tensor-summary',
  templateUrl: './moment-tensor-summary.component.html',
  styleUrls: ['./moment-tensor-summary.component.css']
})
export class MomentTensorSummaryComponent implements OnInit {

  @Input() products: Array<any>;

  constructor(
  ) { }

  ngOnInit() {
  }

  getTensor (product: any): Tensor {
    return Tensor.fromProduct(product);
  }

}
