import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Tensor } from '../../shared/tensor';

@Component({
  selector: 'technical-moment-tensor-summary',
  templateUrl: './moment-tensor-summary.component.html',
  styleUrls: ['./moment-tensor-summary.component.css']
})
export class MomentTensorSummaryComponent implements OnInit {

  constructor(
    public eventService: EventService
  ) { }

  ngOnInit() {
  }

  getTensor (product: any): Tensor {
    return Tensor.fromProduct(product);
  }

}
