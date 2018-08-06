import { Component, Input } from '@angular/core';

import { Tensor } from '../beachball/tensor';


/**
 * NodalPlanesComponent, shows nodal planes for an event
 * @implements {OnInit}
 */
@Component({
  selector: 'shared-nodal-planes',
  templateUrl: './nodal-planes.component.html',
  styleUrls: ['./nodal-planes.component.scss']
})
export class NodalPlanesComponent {


  public columnsToDisplay = [
    'plane',
    'strike',
    'dip',
    'rake'
  ];

  @Input() tensor: Tensor;


  /**
   * Function to return nodal planes associated with a tensor object
   * @returns {any[]}
   */
  getPlanes (tensor: Tensor) {
    if (!tensor) {
      return [];
    }

    return [tensor.NP1, tensor.NP2];
  }

}
