import { Component, Input } from '@angular/core';

import { Tensor } from '../beachball/tensor';

/**
 * NodalPlanesComponent, shows nodal planes for an event
 *
 * @param tensor
 *     The tensor object from the product
 */
@Component({
  selector: 'shared-nodal-planes',
  styleUrls: ['./nodal-planes.component.scss'],
  templateUrl: './nodal-planes.component.html'
})
export class NodalPlanesComponent {
  columnsToDisplay = ['plane', 'strike', 'dip', 'rake'];

  @Input()
  tensor: Tensor;

  /**
   * Function to return nodal planes associated with a tensor object
   * @returns {any[]}
   */
  getPlanes(tensor: Tensor) {
    if (!tensor) {
      return [];
    }

    return [tensor.NP1, tensor.NP2];
  }
}
