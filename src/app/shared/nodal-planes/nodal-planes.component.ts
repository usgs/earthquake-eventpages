import { Component, Input, OnInit } from '@angular/core';

import { Tensor } from '../beachball/tensor';

@Component({
  selector: 'shared-nodal-planes',
  templateUrl: './nodal-planes.component.html',
  styleUrls: ['./nodal-planes.component.scss']
})
export class NodalPlanesComponent implements OnInit {

  public columnsToDisplay = [
    'plane',
    'strike',
    'dip',
    'rake'
  ];

  @Input() tensor: Tensor;

  constructor() { }

  ngOnInit() {
  }

  getPlanes (tensor: Tensor) {
    if (!tensor) {
      return [];
    }

    return [tensor.NP1, tensor.NP2];
  }
}
